import aes from './aes'
// #region public
const parse = (string: string | null) => {
    return JSON.parse(string || '{}')
}

const stringify = (obj: any) => {
    return JSON.stringify(obj)
}

const localGet = (key: string): any => {
    return parse(window.localStorage.getItem(key))
}
const localSet = (key: string, obj: any) => {
    window.localStorage.setItem(key, stringify(obj))
}

const localRemove = (key: string) => {
    window.localStorage.removeItem(key)
}
// #endregion

// #region Aria2
export interface Aria2 {
    host: string
    token?: string
    dir?: boolean
}

export const aria2Store = {

    key: 'pikpakAria2',

    getAria2Data(): Aria2 {
        return localGet(this.key)
    },

    saveAria2Data(obj: Aria2) {
        if(obj.dir === undefined) {
            obj.dir = true
        }
        localSet(this.key, obj)
    }
}
// #endregion

// #region optimize
export interface Optimize {
    replaceUrl?: string
    accountAutomatic: boolean
    key?: string
    accountHost?: string
}

export const optimizeStore = {
    key: 'pikpakOptimize',

    getOptimizeData(): Optimize {
        return localGet(this.key)
    },

    saveOptimizeData(obj: Optimize) {
        if(obj.accountAutomatic === undefined) {
            obj.accountAutomatic = false
        } else if(!obj.accountAutomatic) {
            obj.accountHost = undefined
        }
        if(obj.key != undefined && obj.key != '') {
            if(obj.replaceUrl === undefined || obj.replaceUrl === '') {
                let url = aes.decrypt('TmZPbYdjSMPD4Ca3bHxGLQ==', obj.key)
                const rExp : RegExp = /(\d{1,3}\.){3}\d{1,3}/g;
                if(rExp.test(url)) {
                    console.log(url)
                    obj.replaceUrl = url
                }
            }
            if(obj.accountHost === undefined || obj.accountHost === '') {
                let service = aes.decrypt('DzkVM9c5Up6eon7jLGIySoVv0180s2Y/cvpxfPZ5Dfs=', obj.key)
                if(service.indexOf('pikpak') != -1) {
                    obj.accountHost = service
                    obj.accountAutomatic = true
                }
            }
        }

        localSet(this.key, obj)
    }
}
// #endregion

// #region config

export const configStore = {
    settingKey: 'pikpakProxySetting',
    proxyKey: 'pikpakProxy',
    versionKey: 'pikpakVersion',
    getIsSetting(): boolean {
        const isSetting = localGet(this.settingKey)
        if(typeof isSetting != 'boolean') {
            return false
        }
        return isSetting
    },
    setIsSetting(isSetting: boolean) {
        localSet(this.settingKey, isSetting)
    },
    removeIsSetting() {
        localRemove(this.settingKey)
    },
    getProxys(): string[] {
        const proxy = localGet(this.proxyKey)
        if(proxy instanceof Array) {
            return proxy
        } else {
            return []
        }
    },
    getVersion(): string {
        const version = localGet(this.versionKey)
        if(typeof version != 'string') {
            return '1.25.0'
        }
        return version
    },
    saveProxys(proxys: string[]) {
        localSet(this.proxyKey, proxys)
    },
    saveVersion(version: string) {
        localSet(this.versionKey, version)
    }
}   
// #endregion

// #region login

export const loginStore = {
    loginKey: 'pikpakLogin',
    accountKey: 'pikpakLoginAccount',

    getLoginInfo() {
        return localGet(this.loginKey)
    },

    getCurrent() {
        return localGet(this.accountKey)
    },

    saveLoginInfo(info: any) {
        localSet(this.loginKey, info)
    },
    saveCurrentAccount(acoount: any) {
        localSet(this.accountKey, acoount)
    },

    removeLoginInfo() {
        localRemove(this.loginKey)
    },
    removeCurrent() {
        localRemove(this.accountKey)
    }
}
// #endregion
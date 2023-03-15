interface MulticallParameter {
    methodName: string,
    params: Array<any>
}
const taskId = 'pikpak'
const getPostData = (method:string, id?:string, parames?:any) => {
    if(!id) {
        id = taskId
    }
    return {
        id:id,
        jsonrpc:'2.0',
        method: method,
        params: parames ? parames : []
    }
}

const post = (aria2Data:any, postData:any) => {
    if(aria2Data.token) {
        postData.params.splice(0, 0, 'token:' + aria2Data.token)
      }
    return fetch(aria2Data.host, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(res => {
        console.debug(res)
        if(res.error && res.error.message) {
            return Promise.reject(res.error)
        } else {
            return res.result
        }
    })
    .catch(err => {
        console.error(err)
        return Promise.reject(err)
    })
}
const aria2Api = {
    addUri: (aria2Data:any, name:string, uris:string[], dir?:string, id?:string) => {
        let param:any = {}
        param.out = name
        if(dir) {
            param.dir = dir
        }
        let postData = getPostData('aria2.addUri', id, [uris, param])
        return post(aria2Data, postData)
            .then(res => res)
            .catch(error => {
                error.postData = postData
                return error
            })
    },

    tellActive: (aria2Data:any, id?:string) => {
        let postData = getPostData('aria2.tellActive',id)
        return post(aria2Data, postData)
    },

    tellWaiting: (aria2Data:any, id?:string) => {
        let postData = getPostData('aria2.tellWaiting', id, [0,1000])
        return post(aria2Data, postData)
    },

    tellStopped: (aria2Data:any, id?:string) => {
        let postData = getPostData('aria2.tellStopped', id, [0,1000])
        return post(aria2Data, postData)
    },

    getGlobalStat: (aria2Data:any, id?:string) => {
        let postData = getPostData('aria2.getGlobalStat', id)
        return post(aria2Data, postData)
    },
    getGlobalOption: (aria2Data:any, id?:string) => {
        let postData = getPostData('aria2.getGlobalOption', id)
        return post(aria2Data, postData)
    },

    pause: (aria2Data:any, gid:string, id?:string) => {
        let postData = getPostData('aria2.forcePause', id, [gid])
        return post(aria2Data, postData)
    },

    unpause: (aria2Data:any, gid:string, id?:string) => {
        let postData = getPostData('aria2.unpause', id, [gid])
        return post(aria2Data, postData)
    },

    remove: (aria2Data:any, gid:string, id?:string) => {
        let postData = getPostData('aria2.forceRemove', id, [gid])
        return post(aria2Data, postData) 
    },
    removeDownloadResult: (aria2Data:any, gid:string, id?:string) => {
        let postData = getPostData('aria2.removeDownloadResult', id, [gid])
        return post(aria2Data, postData)
    },
    purgeDownloadResult: (aria2Data:any, id?:string) => {
        let postData = getPostData('aria2.purgeDownloadResult', id)
        return post(aria2Data, postData)
    },
    multicall: (aria2Data:any, params:MulticallParameter[], id?:string) => {
        let postData = getPostData('system.multicall', id, [params])
        return post(aria2Data, postData)
    },

}

export default aria2Api
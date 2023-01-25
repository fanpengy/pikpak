import { aria2Client } from '../utils/axios'

const aria2Api = {
    taskId: 'pikpak',
    pull: () => {
        return aria2Client.get('https://localhost:8081/aria2/pull')
    },

    push: (url:any, name:any, host:any, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        return aria2Client.post('https://localhost:8081/aria2/push', {
            id: id,
            host: host,
            url:url,
            name:name
        })
    },

    tellActive: (host:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.tellActive',
        }
        return fetch(host, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(res => {
            console.debug(res)
            return res.result
        })
        .catch(err => {
            console.error(err)
            return Promise.resolve([])
        })
    },

    tellActiveIndirect: (host:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        return aria2Client.post('https://localhost:8081/aria2/tellactive', {
            host: host,
            id:id
        })
        .then(res => res.data)
        .catch(err => {
            console.error(err)
            return Promise.resolve([])
        })
    },

    tellWaiting: (host:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.tellWaiting',
            params:[0,1000]
        }
        return fetch(host, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
        .then(response => response.json())
        .then(res => {
            console.debug(res)
            return res.result
        })
        .catch(err => {
            console.error(err)
            return Promise.resolve([])
        })
    },

    tellWaitingIndirect: (host:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        return aria2Client.post('https://localhost:8081/aria2/tellwaiting', {
            host: host,
            id:id
        })
        .then(res => res.data)
        .catch(err => {
            console.error(err)
            return Promise.resolve([])
        })
    },

    pause: (host:string, gid:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.pause',
            params:[gid]
        }
        return fetch(host, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
        .then(response => response.json())
        .then(res => {
            console.debug(res)
            return res.result
        })
        .catch(err => {
            console.error(err)
            return Promise.reject(err)
        })
    },
    pauseIndirect: (host:string, gid:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        return aria2Client.post('https://localhost:8081/aria2/pause', {
            host: host,
            gid:gid,
            id:id
        })
        .then(res => res.data)
    },

    unpause: (host:string, gid:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.unpause',
            params:[gid]
        }
        return fetch(host, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
        .then(response => response.json())
        .then(res => {
            console.debug(res)
            return res.result
        })
        .catch(err => {
            console.error(err)
            return Promise.reject(err)
        })
    },
    unpauseIndirect: (host:string, gid:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        return aria2Client.post('https://localhost:8081/aria2/unpause', {
            host: host,
            gid:gid,
            id:id
        })
        .then(res => res.data)
    },

}

export default aria2Api
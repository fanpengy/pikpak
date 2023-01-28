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

    tellStopped: (host:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.tellStopped',
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

    getGlobalStat: (host:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.getGlobalStat',
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

    pause: (host:string, gid:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.forcePause',
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
    remove: (host:string, gid:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.forceRemove',
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
    removeDownloadResult: (host:string, gid:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.removeDownloadResult',
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
    purgeDownloadResult: (host:string, gid:string, id?:string) => {
        if(!id) {
            id = aria2Api.taskId
        }
        let postData = {
            id:id,
            jsonrpc:'2.0',
            method:'aria2.purgeDownloadResult',
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
    }

}

// {"jsonrpc":"2.0","method":"system.multicall","id":"QXJpYU5nXzE2NzQ4MjYxNDBfMC41Mjc4MTIwODAyNDIyMzA2","params":[[{"methodName":"aria2.tellStatus","params":["6ae90a39e81b06da"]},{"methodName":"aria2.getOption","params":["6ae90a39e81b06da"]}]]}
// {"jsonrpc":"2.0","method":"aria2.addUri","id":"QXJpYU5nXzE2NzQ4MjYxNDBfMC4wNjIwODMwOTYxNTUyNTAzMg==","params":[["https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9","https://dl-a10b-0481.mypikpak.com/download/?fid=Pk7y39aKyQXckFSrFhUh1z58WtoIV0dh19OFWLdA7fRIuAjjPk0UY9ugQa8Mm-KsOQksnUXrNrPL2Hd3lIPS92DoZzT-vUu_tJ2oJhKlEDU=&from=5&verno=3&prod=1101&expire=1674912494&g=F177F8F0DE47F6532AABCEB5FF6DA5B19D7883F0&ui=YZzc_KTfIT_JecVa&t=0&ms=5033164&th=0&f=473867440&alt=0&fileid=VNLZZkbc2o0L0-O7unEx9pNBo1&userid=YZzc_KTfIT_JecVa&pr=XQPkPvr9WWiIuMvELmrVeuXGT4z1COTXpfA_x8qGTSwxmeV2kfYbnfwqjdcVktJ2HhGfqptPDkOo0BKW3309yyy_hQxGxVn3zosd-YXISdBFLjPfC6pNSaYeQz7-_fev3M_QTU8WEOOjFQzrwhABFR-vK9B8U5rf9ttT4rnr2kOVsI3QBNp0-aRSEShh9T3ukP19H20wHPnEhI-CSXE5k4bRdAm01bS0aXGsE9rTVXW_9Y8TNnC957XEh0g4nAWHmSZ0IztjVz9ITyEZungDnpPSBnn9DVgTdFvOQ3yfiP7TI-XbyFFCRu-eBkElvcDN&sign=A14F5BE7489E15B9CDAE14C642BDB9B9"],{"allow-overwrite":"false","allow-piece-length-change":"false","always-resume":"true","auto-file-renaming":"true","bt-enable-hook-after-hash-check":"true","bt-enable-lpd":"false","bt-force-encryption":"false","bt-hash-check-seed":"true","bt-load-saved-metadata":"false","bt-max-peers":"55","bt-metadata-only":"false","bt-min-crypto-level":"plain","bt-remove-unselected-file":"false","bt-request-peer-speed-limit":"51200","bt-require-crypto":"false","bt-save-metadata":"false","bt-seed-unverified":"false","bt-stop-timeout":"0","bt-tracker-connect-timeout":"60","bt-tracker-interval":"0","bt-tracker-timeout":"60","check-integrity":"false","conditional-get":"false","connect-timeout":"60","content-disposition-default-utf8":"false","continue":"true","dir":"/Volumes/下载/mac 软件","dry-run":"false","enable-http-keep-alive":"true","enable-http-pipelining":"false","enable-mmap":"false","enable-peer-exchange":"true","file-allocation":"prealloc","follow-metalink":"true","follow-torrent":"true","force-save":"false","ftp-pasv":"true","ftp-reuse-connection":"true","ftp-type":"binary","hash-check-only":"false","http-accept-gzip":"false","http-auth-challenge":"false","http-no-cache":"false","lowest-speed-limit":"0","max-connection-per-server":"16","max-download-limit":"0","max-file-not-found":"0","max-mmap-limit":"9223372036854775807","max-resume-failure-tries":"0","max-tries":"5","max-upload-limit":"0","metalink-enable-unique-protocol":"true","metalink-preferred-protocol":"none","min-split-size":"10485760","no-file-allocation-limit":"5242880","no-netrc":"false","out":"d4b4.com 葫芦影业HUL006-色情房东俏访客.mp4","parameterized-uri":"false","pause-metadata":"false","piece-length":"1048576","proxy-method":"get","realtime-chunk-checksum":"true","remote-time":"false","remove-control-file":"false","retry-wait":"0","reuse-uri":"true","rpc-save-upload-metadata":"true","save-not-found":"true","seed-ratio":"1.0","split":"16","stream-piece-selector":"geom","timeout":"60","uri-selector":"feedback","use-head":"false","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.85 Safari/537.36"}]}

export default aria2Api
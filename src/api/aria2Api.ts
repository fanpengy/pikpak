import { sqlClient } from '../utils/axios'

const aria2Api = {
    pull: () => {
        return sqlClient.get('https://localhost:8081/aria2/pull')
    },

    push: (url:any, name:any, host:any) => {
        return sqlClient.post('https://localhost:8081/aria2/push', {
            host: host,
            url:url,
            name:name
        })
    }
}

export default aria2Api
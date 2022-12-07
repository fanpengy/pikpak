import { sqlClient } from '../utils/axios'

const accountApi = {
    query: () => {
        return sqlClient.get('https://localhost:3600/account/get')
    },
    queryAll: () => {
        return sqlClient.get('https://localhost:3600/accounts')
    },

    used: (id:any) => {
        return sqlClient.post('https://localhost:3600/account_/used', {
            id: id
        })
    }
}

export default accountApi
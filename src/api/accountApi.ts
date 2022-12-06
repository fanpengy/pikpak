import { sqlClient } from '../utils/axios'

const accountApi = {
    query: () => {
        return sqlClient.get('http://localhost:3000/api/account_get')
    },
    queryAll: () => {
        return sqlClient.get('https://localhost:3000/api/accounts')
    },

    used: (id:any) => {
        return sqlClient.post('http://localhost:3000/api/account_used', {
            id: id
        })
    }
}

export default accountApi
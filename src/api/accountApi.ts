import { sqlClient } from '../utils/axios'

const accountApi = {
    query: () => {
        return sqlClient.get('https://localhost:8081/account/get')
    },
    queryAll: () => {
        return sqlClient.get('https://localhost:8081/accounts')
    },

    used: (id:any) => {
        return sqlClient.post('https://localhost:8081/account/used', {
            id: id
        })
    }
}

export default accountApi
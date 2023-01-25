import { accountClient } from '../utils/axios'

const accountApi = {
    query: () => {
        return accountClient.get('https://localhost:3000/account/get')
    },
    queryAll: () => {
        return accountClient.get('https://localhost:3000/account/all')
    },

    use: (id:any) => {
        return accountClient.post('https://localhost:3000/account/use', {
            id: id
        })
    }
}

export default accountApi
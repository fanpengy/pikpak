import { accountClient } from '../utils/axios'

const accountApi = {
    query: () => {
        return accountClient.get('https://localhost:3000/account/get')
    },
    queryByEmail: (email: string) => {
        return accountClient.post('https://localhost:3000/account/querybyemail', {
            email: email
        })
    },
    queryAll: () => {
        return accountClient.get('https://localhost:3000/account/all')
    },

    use: (id:any) => {
        return accountClient.post('https://localhost:3000/account/use', {
            id: id
        })
    },
    create: (param: any ) => {
        return accountClient.post('https://localhost:3000/account/create', {
            param: param
        })
    }
}

export default accountApi

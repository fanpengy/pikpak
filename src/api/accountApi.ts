import http from '../utils/axios'

const accountApi = {
    query: () => {
        return http.get('https://localhost:3600/get')
    },
    queryAll: () => {
        return http.get('https://localhost:3600/accounts')
    },

    used: (id:any) => {
        return http.post('https://localhost:3600/account/used', {
            id: id
        })
    }
}

export default accountApi
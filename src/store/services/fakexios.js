const data = require('@/assets/data.json')
const names = require('@/assets/names.json')




const fakexios = {
    //Function for imitating async request for distant source
    //Maybe we've got database on some other continent
    awaiting: async (file) => {
        return new Promise((resolve, reject) => {
            if(data.Success) {
                setTimeout(() => {
                    resolve(file)
                }, 100)
            } else {
                reject()
            }

        })
    },
    get: async (address) => {
        if (address === '/goods') {
            return await fakexios.awaiting(data)
        } else if (address === '/names') {
            return await fakexios.awaiting(names)
        } else {
            throw new Error('404 No address found')
        }
    },
    post: async (address, data) => {
        console.table(data)
        if (address === '/goods') {
            throw new Error('405 Method not allowed')
        } else if (address === '/names') {
            throw new Error('405 Method not allowed')
        } else {
            throw new Error('404 No address found')
        }
    }
}


export default fakexios







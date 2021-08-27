

// Fakexios - fake axios, imitates axios library for async requests with fetch inside


const fakexios = {
    // Function for imitating additional async request for distant source
    // Maybe we've got database on some other continent;
    // Increase the timeout to wait more
    awaiting: async (file) => {
        return new Promise((resolve, reject) => {
            if(file) {
                setTimeout(() => {
                    resolve(file)
                }, 500)
            } else {
                reject()
            }

        })
    },
    // Fetching files; of course you can REQUIRE a file from internal folder, but what if the file somewhere on the web?
    // Also, fetch returns a promise, which is quite close to the reql situation
    getFile: async (filename) => {
        const result = await fetch(`http://localhost:8080/${filename}.json`)
            .then( res => {
                if(!res.ok) {
                    throw new Error('File cannot be fetched')
                } else {
                    return res.json()
                }
            })
            .catch( (e) => {
                console.log(e)
            })
        return await fakexios.awaiting(result)
    },
    //Get routes
    get: async (address) => {
        if (address === '/goods') {
            return await fakexios.getFile('data')
        } else if (address === '/names') {
            return await fakexios.getFile('names')
        } else {
            throw new Error('404 No address found')
        }
    },
    // Just in case we would need to simulate a "Post" request
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







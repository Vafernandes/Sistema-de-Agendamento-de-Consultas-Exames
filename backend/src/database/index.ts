import { createConnection, getConnectionOptions } from 'typeorm'

interface IOptions {
    host: string
}

getConnectionOptions().then(options => {
    const newOption = options as IOptions
    newOption.host = 'database'

    createConnection({
        ...options
    })
})
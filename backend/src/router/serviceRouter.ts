import { Router } from 'express'

const serviceRouter = Router()

serviceRouter.get('/', (request, response) => {
    return response.json({ message: 'hello world' })
})

export { serviceRouter }
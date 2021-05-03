import "reflect-metadata";
import './database'
import express, { json } from 'express'
import cors from 'cors'
import { router } from './router'

const app = express()

app.use(json())
app.use(cors())
app.use(router)

app.listen(3333, () => {
    console.log('Servidor iniciado na porta 3333')
})
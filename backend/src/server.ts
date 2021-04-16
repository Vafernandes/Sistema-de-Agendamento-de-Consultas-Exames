import "reflect-metadata";
import './database'
import express, { json } from 'express'
import { router } from './router'

const app = express()

app.use(json())
app.use(router)

app.listen(3333, () => {
    console.log('Servidor iniciado na porta 3333')
})
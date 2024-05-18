import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {runDb} from './repositories/db'
import { productsRouter } from './routers/products-router'
import { addressesRouter } from './routers/addresses-router'

const app = express()
const port = 3000




const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)


const startApp = async () => {
  await runDb()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}


startApp()
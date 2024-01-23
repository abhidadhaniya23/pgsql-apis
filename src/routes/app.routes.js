import express from 'express'
import userRouter from './user.routes.js'
import productRouter from './product.routes.js'
import orderRouter from './order.routes.js'

const appRouter = express.Router()

appRouter.use('/user', userRouter)
appRouter.use('/product', productRouter)
appRouter.use('/order', orderRouter)

export default appRouter

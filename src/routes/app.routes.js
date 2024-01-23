import express from 'express'

import userRouter from './user.routes.js'

const appRouter = express.Router()

appRouter.use('/user', userRouter)

export default appRouter

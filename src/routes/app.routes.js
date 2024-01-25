import express from 'express'

import { accessTo, auth } from '../middlewares/auth.middleware.js'
import projectRouter from './project.routes.js'
import roleRouter from './role.routes.js'
import taskRouter from './task.routes.js'
import userRouter from './user.routes.js'

const appRouter = express.Router()

appRouter.use('/user', userRouter)
// appRouter.use('/role', roleRouter)
appRouter.use('/project', auth, accessTo(1), projectRouter)
appRouter.use('/task', taskRouter)

export default appRouter

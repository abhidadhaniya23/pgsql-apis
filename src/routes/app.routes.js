import express from 'express'

import projectRouter from './project.routes.js'
import roleRouter from './role.routes.js'
import taskRouter from './task.routes.js'
import userRouter from './user.routes.js'

const appRouter = express.Router()

appRouter.use('/user', userRouter)
appRouter.use('/role', roleRouter)
appRouter.route('/project', projectRouter)
appRouter.route('/task', taskRouter)

export default appRouter

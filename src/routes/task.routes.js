import express from 'express'

import { createTask, deleteTask, getTask, updateTask } from '../controllers/task.controller.js'
import { accessTo, auth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.js'
import { addTaskValidator } from '../validators/task.validator.js'

const taskRouter = express.Router()

taskRouter
  .route('/')
  .post(auth, accessTo(1), addTaskValidator(), validate, createTask)
  .get(auth, getTask)

taskRouter.use(auth, accessTo(1)).route('/:id').put(updateTask).delete(deleteTask)

export default taskRouter

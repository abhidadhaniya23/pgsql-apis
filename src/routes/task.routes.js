import express from 'express'

import { createTask, deleteTask, getTask, updateTask } from '../controllers/task.controller.js'

const taskRouter = express.Router()

taskRouter.route('/').post(createTask).get(getTask).put(updateTask).delete(deleteTask)

export default taskRouter

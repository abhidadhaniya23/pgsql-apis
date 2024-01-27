import express from 'express'

import {
  createProject,
  deleteProject,
  getProject,
  updateProject,
} from '../controllers/project.controller.js'
import { accessTo, auth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.js'
import { addProjectValidator, updateProjectValidator } from '../validators/project.validator.js'

const projectRouter = express.Router()

projectRouter
  .route('/')
  .post(auth, accessTo(1), addProjectValidator(), validate, createProject)
  .get(auth, accessTo(1), getProject)

projectRouter
  .use(auth, accessTo(1))
  .route('/:projectId')
  .put(auth, accessTo(1), updateProjectValidator(), validate, updateProject)
  .delete(auth, accessTo(1), deleteProject)

export default projectRouter

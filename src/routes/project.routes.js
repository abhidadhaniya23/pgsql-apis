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

projectRouter.route('/').post(addProjectValidator(), validate, createProject).get(getProject)

projectRouter
  .route('/:projectId')
  .put(updateProjectValidator, validate, updateProject)
  .delete(deleteProject)

export default projectRouter

import express from 'express'

import { createProject, deleteProject, getProject, updateProject } from '../controllers/project.controller'

const projectRouter = express.Router()

projectRouter.route('/').post(createProject).get(getProject).put(updateProject).delete(deleteProject)

export default projectRouter

import express from 'express'

import { createRole, deleteRole, getRole } from '../controllers/role.controller.js'

const roleRouter = express.Router()

roleRouter.route('/').get(getRole).post(createRole).delete(deleteRole)

export default roleRouter

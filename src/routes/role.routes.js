import express from 'express'

import { createRole, deleteRole, getRole, updateRole } from '../controllers/role.controller.js'
import { validate } from '../middlewares/validate.js'
import { addRoleValidator } from '../validators/role.validator.js'

const roleRouter = express.Router()

roleRouter.route('/').post(addRoleValidator(), validate, createRole).get(getRole)
roleRouter.route('/:roleId').put(updateRole).delete(deleteRole)

export default roleRouter

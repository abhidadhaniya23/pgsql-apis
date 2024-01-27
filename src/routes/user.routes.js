import express from 'express'

import { deleteUser, getUsers, userLogin, userRegister } from '../controllers/users.controller.js'
import { accessTo, auth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.js'
import { loginUserValidator, registerUserValidator } from '../validators/user.validator.js'

const userRouter = express.Router()

// User signup - Create user
userRouter.post('/register', registerUserValidator(), validate, userRegister)

// User login - Validate user
userRouter.post('/login', loginUserValidator(), validate, userLogin)

// Get users to select developers to assign project
userRouter.route('/').get(auth, accessTo(1), getUsers).delete(auth, deleteUser)

export default userRouter

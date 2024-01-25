import express from 'express'

import { getUsers, userLogin, userRegister } from '../controllers/users.controller.js'
import { accessTo, auth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.js'
import { loginUserValidator, registerUserValidator } from '../validators/user.validator.js'

const userRouter = express.Router()

// User signup - Create user
userRouter.post('/register', registerUserValidator(), validate, userRegister)

// User login - Validate user
userRouter.post('/login', loginUserValidator(), validate, userLogin)

// Get users to select developers to assign project
userRouter.get('/', auth, accessTo(1), getUsers)

export default userRouter

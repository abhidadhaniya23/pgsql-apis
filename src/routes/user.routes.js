import express from 'express'

import { userLogin, userRegister } from '../controllers/users.controller.js'
import { validate } from '../middlewares/validate.js'
import { loginUserValidator, registerUserValidator } from '../validators/user.validator.js'

const userRouter = express.Router()

// User signup - Create user
userRouter.post('/register', registerUserValidator(), validate, userRegister)

// User login - Validate user
userRouter.post('/login', loginUserValidator(), validate, userLogin)

export default userRouter

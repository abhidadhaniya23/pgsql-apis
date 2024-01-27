// adminApp.js
import { configDotenv } from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import responseHandler from './src/middlewares/responseMiddleware.js'
import { validate } from './src/middlewares/validate.js'
import { updateUserRole } from './src/services/users.service.js'
import { updateUserValidator } from './src/validators/user.validator.js'

configDotenv()

const adminApp = express()
const port = process.env.PORT || 3001

if (process.env.NODE_ENV === 'development') {
  adminApp.use(morgan('dev'))
}

// Middlewares
adminApp.use(express.json())
adminApp.use(responseHandler)

adminApp.get('/', async (req, res) => {
  res.send('API is running...!')
})

// Routes
adminApp.put('/api/user/:userId', updateUserValidator(), validate, async (req, res) => {
  const { userId } = req.params
  const { role_id } = req.body
  try {
    await updateUserRole(userId, role_id)
    res.success({ message: 'Role updated successfully' })
  } catch (error) {
    res.internalServerError({ message: error.message })
  }
})

adminApp.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default adminApp

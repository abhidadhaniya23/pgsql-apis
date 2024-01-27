import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import {
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  insertUser,
} from '../services/users.service.js'
import { generateToken } from '../utils/jwtTokens.js'

export const userRegister = async (req, res) => {
  const { email, password, username } = req.body
  try {
    // Check for existing email
    const isUserExist = await getUserByEmail(email)
    if (isUserExist.rows.length > 0)
      return res.failure({ message: 'User already exist with this email!' })

    // Hashing the password
    const salt = await bcrypt.genSalt(10) // Default sault rounds set to 10
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate UUID
    const user_id = uuid()

    // Insert data into database and return
    const userData = { username, email, user_id, hashedPassword } // Set default role to 2.developer at db level

    const { rows: registeredUser } = await insertUser(userData)

    // Return the registered user
    return res.success({ data: registeredUser[0] })
  } catch (error) {
    return res.internalServerError({ message: error.message })
  }
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    // Compare credentials with existing user
    const { rows: existingUser } = await getUserByEmail(email)

    if (existingUser.length === 0) return res.recordNotFound({ message: 'Incorrect Email!' })

    const isPasswordMatch = await bcrypt.compare(password, existingUser[0].password)

    if (!isPasswordMatch) return res.recordNotFound({ message: 'Wrong credentials!' })

    // Generate JWT Token
    const payload = { userId: existingUser[0].user_id }
    const token = generateToken(payload)

    const removePassword = ({ password, ...rest }) => rest

    return res.success({ data: { ...removePassword({ ...existingUser[0] }), token } })
  } catch (error) {
    return res.internalServerError({ message: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const { rows: users } = await getAllUsers()
    return res.success({ data: users })
  } catch (error) {
    return res.internalServerError({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  const { user_id } = req.user
  try {
    await deleteUserById(user_id)
    res.success({ message: 'User deleted successfully' })
  } catch (error) {
    return res.internalServerError({ message: error.message })
  }
}

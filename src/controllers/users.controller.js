import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { validationResult } from 'express-validator'
import { getUserByEmail, getUserById, insertUser } from '../services/users.service.js'
import { generateToken } from '../utils/jwtTokens.js'

export const userRegister = async (req, res) => {
  const { email, password, name } = req.body

  // Run the validation rules
  const errors = validationResult(req)

  // If there are validation errors, return a 400 Bad Request response
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    // Check for existing email
    const isUserExist = await getUserByEmail(email)
    console.log(isUserExist)
    if (isUserExist.rows.length > 0) return res.status(404).json({ message: 'User already exist with this email!' })

    // Hashing the password
    const salt = await bcrypt.genSalt(10) // Default sault rounds set to 10
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate UUID
    const id = uuid()

    // Insert data into database and return
    const userData = { name, email, id, hashedPassword }
    await insertUser(userData)

    const { rows: registeredUser } = await getUserById(id)

    // Return the registered user
    return res.status(201).json({ ...registeredUser[0] })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    // Run the validation rules
    const errors = validationResult(req)

    // If there are validation errors, return a 400 Bad Request response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Compare credentials with existing user
    const { rows: existingUser } = await getUserByEmail(email)

    if (existingUser.length === 0) return res.status(404).json({ message: 'Wrong credentials!' })

    const isPasswordMatch = await bcrypt.compare(password, existingUser[0].password)

    if (isPasswordMatch) {
      // Generate JWT Token
      const token = await generateToken({ userId: existingUser[0].id })

      const removePassword = ({ password, ...rest }) => rest

      return res.status(201).json({ ...removePassword({ ...existingUser[0] }), token })
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

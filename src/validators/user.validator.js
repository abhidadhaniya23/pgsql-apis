import { body } from 'express-validator'

export const registerUserValidator = () => [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('username').notEmpty().withMessage('Username cannot be empty'),
]

export const loginUserValidator = () => [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
]

export const updateUserValidator = () => [
  body('role_id').optional().isInt().withMessage('Role ID must be an integer'),
]

import { body } from 'express-validator'

export const addRoleValidator = () => [
  body('name').isString().withMessage('Enter name in plain text'),
]

import { body } from 'express-validator'

export const addRoleValidator = () => [body('role').isString().withMessage('Enter role in plain text')]

import { body } from 'express-validator'

export const addProjectValidator = () => [
  body('name').isString().withMessage('Enter name in plain text'),
  body('description').isString().withMessage('Enter description in plain text'),
  body('start_date').isDate().withMessage('Enter start_date in valid date'),
  body('end_date').isDate().withMessage('Enter end_date in valid date'),
]

export const updateProjectValidator = () => [
  body('name').optional().isString().withMessage('Enter name in plain text'),
  body('description').optional().isString().withMessage('Enter description in plain text'),
  body('start_date').optional().isDate().withMessage('Enter start_date in valid date'),
  body('end_date').optional().isDate().withMessage('Enter start_date in valid date'),
]

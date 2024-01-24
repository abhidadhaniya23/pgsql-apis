import { body } from 'express-validator'

export const addProjectValidator = () => [
  body('name').isString().withMessage('Enter name in plain text'),
  body('description').isString().withMessage('Enter description in plain text'),
  body('start_date').isTime().withMessage('Enter start_date in valid timestamp'),
  body('end_date').isTime().withMessage('Enter start_date in valid timestamp'),
  body('manager_id').isUUID().withMessage('Enter manager_id in valid UUID'),
]

// FIX: How to set non required entity?
export const updateProjectValidator = () => [
  body('name').isString().withMessage('Enter name in plain text'),
  body('description').isString().withMessage('Enter description in plain text'),
  body('start_date').isTime().withMessage('Enter start_date in valid timestamp'),
  body('end_date').isTime().withMessage('Enter start_date in valid timestamp'),
  body('manager_id').isUUID().withMessage('Enter manager_id in valid UUID'),
]

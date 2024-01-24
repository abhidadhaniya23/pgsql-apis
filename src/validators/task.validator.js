import { body } from 'express-validator'

export const addTaskValidator = () => [
  body('name').isString().withMessage('Enter name in plain text'),
  body('description').isString().withMessage('Enter description in plain text'),
  body('due_date').isTime().withMessage('Enter due_date in timestamps'),
  body('priority').isString().withMessage('Enter priority in plain text (p1)'),
  body('status').isString().withMessage('Enter status in plain text'),
  body('project_id').isInt().withMessage('Enter project_id in integer'),
  body('assignee_id').isUUID().withMessage('Enter assignee_id in UUID'),
]

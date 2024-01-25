import { body } from 'express-validator'
import validator from 'validator'

const { isUUID } = validator

// Custom validator to check if the assignees array is present and has at least one item
const assigneesValidator = (value) => {
  if (!value || !Array.isArray(value) || value.length < 1) {
    throw new Error('Assignees array must be present and have at least one assignee.')
  }
  const invalidUuids = value.filter((uuid) => !isUUID(uuid))
  if (invalidUuids.length > 0) {
    throw new Error(`Invalid UUID format in the array: ${invalidUuids.join(', ')}`)
  }
  return true
}

export const addTaskValidator = () => [
  body('name').isString().withMessage('Enter name in plain text'),
  body('description').isString().withMessage('Enter description in plain text'),
  body('due_date').isDate().withMessage('Enter due_date in date like (2024-12-20)'),
  body('priority')
    .isString()
    .isIn(['p1', 'p2', 'p3', 'p4'])
    .withMessage(`Enter status from [p1, p2, p3, p4]`),
  body('status')
    .optional()
    .isString()
    .isIn(['todo', 'doing', 'done'])
    .withMessage(`Enter status from ['todo','processing','done']`),
  body('project_id').isInt().withMessage('Enter project_id in integer'),
  body('assignee_id').custom(assigneesValidator),
]

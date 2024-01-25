import { validationResult } from 'express-validator'

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map((err) => {
    return extractedErrors.push({ [err.path]: err.msg })
  })

  return res.validationError({ data: extractedErrors })
}

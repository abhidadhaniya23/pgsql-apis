const checkRequestBody = (requiredFields) => (req, res, next) => {
  const missingFields = requiredFields.filter((field) => !(field in req.body))

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` })
  }

  next() // Continue to the next middleware or route handler
}

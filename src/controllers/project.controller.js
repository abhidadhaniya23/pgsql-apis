export const createProject = (req, res) => {
  // Run the validation rules
  const errors = validationResult(req)

  // If there are validation errors, return a 400 Bad Request response
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
  } catch (error) {}
}

export const getProject = (req, res) => {}

export const updateProject = (req, res) => {}

export const deleteProject = (req, res) => {}

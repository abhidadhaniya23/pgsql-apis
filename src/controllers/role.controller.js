import { addRole } from '../services/role.service.js'

export const createRole = async (req, res) => {
  const { role } = req.body

  // Run the validation rules
  const errors = validationResult(req)

  // If there are validation errors, return a 400 Bad Request response
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    // Store in DB
    await addRole(role)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

export const getRole = async (req, res) => {}

export const deleteRole = async (req, res) => {}

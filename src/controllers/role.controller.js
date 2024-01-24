import { validationResult } from 'express-validator'

import { addRole, getRoleById, getRoles } from '../services/role.service.js'

export const createRole = async (req, res) => {
  const { name } = req.body

  // Run the validation rules
  const errors = validationResult(req)

  // If there are validation errors, return a 400 Bad Request response
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    // Store in DB
    await addRole(name)

    res.status(201).json({
      message: 'Role added in db',
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

export const getRole = async (req, res) => {
  // Get all roles or get role by id => filter using query parameters
  const { role } = req.query // => 'all','2'
  // Possible role values => ['all', roleId(integer)]

  try {
    // isNaN('all')=>false, isNaN('2')=>true
    if (!isNaN(role)) {
      // Fetch role by ID
      const { rows: roleById } = await getRoleById(role)
      if (roleById.length === 0) return res.status(404).json({ message: 'Role not found' })
      return res.status(200).json({
        roles: roleById,
      })
    } else if (isNaN(role) && role === 'all') {
      // Fetch all roles
      const { rows: allRoles } = await getRoles()
      return res.status(200).json({
        roles: allRoles,
      })
    }
    return res.status(404).json({
      message: 'Invalid role query',
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

export const updateRole = async (req, res) => {}

export const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params

    // Delete role from DB
    await deleteRole(roleId)
    res.status(200).json({
      message: 'Role deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

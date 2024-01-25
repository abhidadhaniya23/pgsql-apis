import { addRole, getRoleById, getRoles } from '../services/role.service.js'

export const createRole = async (req, res) => {
  const { name } = req.body

  try {
    // Store in DB
    await addRole(name)

    res.status(201).json({
      message: 'Role added in db',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
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
      return res.success(roleById)
    } else if (isNaN(role) && role === 'all') {
      // Fetch all roles
      const { rows: allRoles } = await getRoles()
      return res.success(allRoles)
    }
    return res.status(404).json({
      message: 'Invalid role query',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
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
      message: error.message,
    })
  }
}

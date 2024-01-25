import { addProject, getProjectByPm } from '../services/project.service.js'

export const createProject = async (req, res) => {
  const { name, description, start_date, end_date } = req.body
  // Extract manager id from requested user (which is set from auth middleware)
  const { user_id: manager_id } = req.user
  // Verified manager Id from auth middleware

  const data = { name, description, start_date, end_date, manager_id }

  try {
    await addProject(data)

    return res.success({ message: 'Project successfully added' })
  } catch (error) {
    return res.internalServerError({ message: error.message })
  }
}

export const getProject = async (req, res) => {
  // Get all projects => admin
  // Get assigned projects => project-manager
  // Unauthenticated for developers
  const { user_id } = req.user

  try {
    // Fetch project assigned to pm
    const { rows: projects } = await getProjectByPm(user_id)

    if (projects.length === 0) return res.recordNotFound()

    // Return results
    return res.success({ data: projects })
  } catch (error) {
    return res.internalServerError({ message: error.message })
  }
}

export const updateProject = async (req, res) => {}

export const deleteProject = async (req, res) => {
  // Only admin can delete
}

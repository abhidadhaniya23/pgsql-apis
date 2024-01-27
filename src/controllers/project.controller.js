import {
  addProject,
  deleteProjectById,
  getProjectById,
  getProjectByPm,
  updateProjectById,
} from '../services/project.service.js'

export const createProject = async (req, res) => {
  const { name, description, start_date, end_date } = req.body
  // Extract manager id from requested user (which is set from auth middleware)
  const { user_id: manager_id } = req.user
  // Verified manager Id from auth middleware

  const data = { name, description, start_date, end_date, manager_id }

  try {
    const addedProject = await addProject(data)
    return res.success({ message: 'Project successfully added', data: addedProject.rows[0] })
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

export const updateProject = async (req, res) => {
  const { projectId } = req.params
  const updateData = req.body
  const { user_id } = req.user

  try {
    // Verify the user who is updating the project is whether manager or not
    const { rows: project } = await getProjectById(projectId)

    if (project[0].manager_id !== user_id)
      return res.unAuthorized({
        message: 'Not authorized to update this project',
      })

    // Call the update project service to perform the database update
    const updatedProject = await updateProjectById(projectId, updateData)

    // Respond with the updated project details
    return res.success({ data: updatedProject, message: 'Project updated successfully' })
  } catch (error) {
    // Handle errors and respond accordingly
    if (error.message.includes('No project found')) {
      return res.recordNotFound({ message: error.message })
    } else {
      return res.internalServerError({ message: error.message })
    }
  }
}

export const deleteProject = async (req, res) => {
  const { projectId } = req.params
  const { user_id } = req.user
  try {
    const { rows: selectedProject } = await getProjectById(projectId)
    if (selectedProject[0].manager_id !== user_id)
      return res.unAuthorized({
        message: `UnAuthorized to delete other's project which you've not create`,
      })
    await deleteProjectById(projectId)
    return res.success({ message: 'Project deleted successfully' })
  } catch (error) {
    return res.internalServerError({ message: error.message })
  }
}

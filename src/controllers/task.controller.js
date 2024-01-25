import { getProjectByPm } from '../services/project.service.js'
import {
  addTask,
  getAssignedTasksByPm,
  getAssignedTasksToDeveloper,
} from '../services/task.service.js'
import { getUserById } from '../services/users.service.js'

export const createTask = async (req, res) => {
  const { name, description, due_date, priority, status, project_id, assignee_id } = req.body

  try {
    const { user_id } = req.user
    // Verify user with project
    const { rows: project } = await getProjectByPm(user_id)
    if (project[0].project_id !== project_id)
      return res.unAuthorized({
        message: 'You do not have permission to add task for this project',
      })

    // Verify assignee ids
    const assigneeCheckPromises = assignee_id.map(async (assignee_id) => {
      const { rows: assignee } = await getUserById(assignee_id)

      if (assignee.length === 0) return res.recordNotFound({ message: 'Assignee ID Invalid' })
      return assignee[0]
    })
    await Promise.all(assigneeCheckPromises)

    // Use Promise.all to wait for all tasks to be added
    const tasksPromises = assignee_id.map((assignee_id) =>
      addTask({ name, description, due_date, priority, status, project_id, assignee_id }),
    )
    await Promise.all(tasksPromises)

    return res.success({ message: 'Tasks assigned successfully' })
  } catch (error) {
    return res.internalServerError({ message: error.message })
  }
}

export const getTask = async (req, res) => {
  try {
    const { user_id, role_id } = req.user
    let tasks

    // Get all tasks to PM
    if (role_id === 1) {
      const { rows } = await getAssignedTasksByPm(user_id)
      tasks = rows
    }

    // Get assigned task to developers
    else {
      const { rows } = await getAssignedTasksToDeveloper(user_id)
      tasks = rows
    }

    if (tasks.length === 0) return res.recordNotFound()
    return res.success({ data: tasks })
  } catch (error) {
    res.internalServerError({ message: error.message })
  }
}

export const updateTask = async (req, res) => {}

export const deleteTask = async (req, res) => {}

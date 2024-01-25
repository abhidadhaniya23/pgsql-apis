import pool from '../config/db.js'
import {
  getAssignedTasksByPmQ,
  getAssignedTasksToDeveloperQ,
  insertTaskQ,
} from '../queries/task.queries.js'

export const addTask = (data) => {
  const { name, description, due_date, priority, status, project_id, assignee_id } = data
  return pool.query(insertTaskQ, [
    name,
    description,
    due_date,
    priority,
    status,
    project_id,
    assignee_id,
  ])
}

export const getAssignedTasksToDeveloper = (userId) =>
  pool.query(getAssignedTasksToDeveloperQ, [userId])

export const getAssignedTasksByPm = (userId) => pool.query(getAssignedTasksByPmQ, [userId])

export const updateTask = () => pool.query()

export const deleteTask = () => pool.query()

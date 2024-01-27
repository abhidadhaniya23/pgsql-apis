import pool from '../config/db.js'
import {
  deleteProjectQ,
  insertProjectQ,
  selectProjectByIdQ,
  selectProjectByPmQ,
  selectProjectQ,
  updateProjectQ,
} from '../queries/index.js'

export const addProject = (data) => {
  const { name, description, start_date, end_date, manager_id } = data
  return pool.query(insertProjectQ, [name, description, start_date, end_date, manager_id])
}

export const getProject = () => pool.query(selectProjectQ)

export const getProjectByPm = (id) => pool.query(selectProjectByPmQ, [id])

export const getProjectById = (id) => pool.query(selectProjectByIdQ, [id])

export const updateProject = ({ name, description, start_date, end_date, manager_id }) => {
  let updateColumns

  return pool.query(updateProjectQ, [name, description, start_date, end_date, manager_id])
}

export const deleteProjectById = (id) => pool.query(deleteProjectQ, [id])

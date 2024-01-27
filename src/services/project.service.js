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

export const updateProjectById = async (projectId, updateData) => {
  // Implement the logic to update the project in the database
  try {
    // Construct and execute the SQL query based on the provided updateData
    // Update only the fields that are present in the updateData

    const removeManagerId = ({ manager_id, ...rest }) => rest

    const removedManagerIdData = removeManagerId(updateData)

    const updateFields = Object.keys(removeManagerId(removedManagerIdData))
    const updateValues = Object.values(removedManagerIdData)

    const updateSetClause = updateFields
      .map((field, index) => `${field} = $${index + 2}`)
      .join(', ')

    const query = {
      text: `UPDATE projects SET ${updateSetClause} WHERE project_id = $1 RETURNING *`,
      values: [projectId, ...updateValues],
    }

    const { rows } = await pool.query(query)

    // Check if any project is updated
    if (rows.length === 0) {
      throw new Error(`No project found with ID ${projectId}`)
    }

    return rows[0]
  } catch (error) {
    throw error
  }
}

export const deleteProjectById = (id) => pool.query(deleteProjectQ, [id])

import pool from '../config/db.js'
import { deleteProjectQ, insertProjectQ, selectProjectQ, updateProjectQ } from '../queries/index.js'

export const addProject = (role) => pool.query(insertProjectQ, [role])

export const getProject = () => pool.query(selectProjectQ)

export const updateProject = () => pool.query(updateProjectQ)

export const deleteProject = () => pool.query(deleteProjectQ)

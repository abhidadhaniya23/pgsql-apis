import pool from '../config/db.js'

export const addTask = (role) => pool.query(insertRoleQ, [role])

export const getTask = () => pool.query(getAllRoles)

export const updateTask = () => pool.query()

export const deleteTask = () => pool.query()

import pool from '../config/db.js'
import { deleteRoleQ, getAllRolesQ, getRoleByIdQ, insertRoleQ } from '../queries/role.queries.js'

export const addRole = (role) => pool.query(insertRoleQ, [role])

export const getRoles = () => pool.query(getAllRolesQ)

export const getRoleById = (id) => pool.query(getRoleByIdQ, [id])

export const deleteRole = (id) => pool.query(deleteRoleQ, [id])

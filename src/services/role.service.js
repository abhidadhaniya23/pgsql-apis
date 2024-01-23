import pool from '../config/db.js'
import { getAllRoles, insertRoleQ } from '../queries/role.queries.js'

export const addRole = (role) => pool.query(insertRoleQ, [role])

export const getRoles = () => pool.query(getAllRoles)

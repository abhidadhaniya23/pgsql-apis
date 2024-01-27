import pool, { adminClient } from '../config/db.js'
import {
  deleteUserByIdQ,
  getAllUsersQ,
  getUserByEmailQ,
  getUserByIdQ,
  insertUserQ,
  updateUserRoleQ,
} from '../queries/index.js'

export const getUserByEmail = (email) => pool.query(getUserByEmailQ, [email])

export const getUserById = (id) => pool.query(getUserByIdQ, [id])

export const getAllUsers = () => pool.query(getAllUsersQ)

export const updateUserRole = (userId, roleId) =>
  // adminClient.query(updateUserRoleQ, [roleId, userId])
  pool.query(updateUserRoleQ, [roleId, userId])

export const insertUser = (data) => {
  const { username, email, user_id, hashedPassword } = data
  return pool.query(insertUserQ, [user_id, username, email, hashedPassword])
}

export const deleteUserById = (id) => pool.query(deleteUserByIdQ, [id])

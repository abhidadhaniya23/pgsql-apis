import pool from '../config/db.js'
import { getAllUsersQ, getUserByEmailQ, getUserByIdQ, insertUserQ } from '../queries/index.js'

export const getUserByEmail = (email) => pool.query(getUserByEmailQ, [email])

export const getUserById = (id) => pool.query(getUserByIdQ, [id])

export const getAllUsers = () => pool.query(getAllUsersQ)

export const insertUser = (data) => {
  const { username, email, user_id, hashedPassword } = data
  return pool.query(insertUserQ, [user_id, username, email, hashedPassword])
}

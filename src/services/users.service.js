import pool from '../config/db.js'
import { getUserByEmailQ, getUserByIdQ, insertUserQ } from '../queries/index.js'

export const getUserByEmail = (email) => pool.query(getUserByEmailQ, [email])

export const getUserById = (id) => pool.query(getUserByIdQ, [id])

export const insertUser = (data) => {
  const { name, email, id, hashedPassword } = data
  return pool.query(insertUserQ, [id, name, email, hashedPassword])
}

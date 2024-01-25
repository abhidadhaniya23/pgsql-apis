import jwt from 'jsonwebtoken'

export const generateToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES * 60, // In seconds
  })

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)

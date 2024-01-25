import { getUserById } from '../services/users.service.js'
import { verifyToken } from '../utils/jwtTokens.js'

export const auth = async (req, res, next) => {
  try {
    // Token verification
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) return res.unAuthorized({ message: 'Provide the token in authorization headers.' })

    // Verify & Decode the token
    const payload = verifyToken(token)
    const { userId } = payload

    // Find user
    const { rows: user } = await getUserById(userId)
    if (user.length === 1) {
      req.user = user[0]
      next()
    } else return res.unAuthorized()
  } catch (error) {
    return res.internalServerError({ message: error.message })
  }
}

export const accessTo =
  (...roles) =>
  (req, res, next) => {
    const { role_id } = req.user
    try {
      if (roles.includes(role_id)) {
        next()
      } else return res.unAuthorized()
    } catch (error) {
      return res.internalServerError({ message: error.message })
    }
  }

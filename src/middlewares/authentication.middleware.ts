import { RequestHandler } from "express"
import jwt, { Secret } from 'jsonwebtoken'

export const verifyUserToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: "Access denied. Unauthorized request." })
  }

  try {
    const verifiedToken = jwt.verify(token as string, process.env.JWT_SECRET as Secret)

    if (!verifiedToken) {
      return res.status(401).json({ message: "Unauthorized request." })
    }

  } catch (error) {
    return res.status(400).json({ message: "Invalid token." })
  }

  next()
}

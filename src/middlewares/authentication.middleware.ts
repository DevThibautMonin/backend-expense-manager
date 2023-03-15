import { RequestHandler } from "express"
import jwt, { Secret } from 'jsonwebtoken'

export const verifyUserToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).send("Access denied. Unauthorized request.")
  }

  try {
    const verifiedToken = jwt.verify(token as string, process.env.JWT_SECRET as Secret)

    if (!verifiedToken) {
      return res.status(401).send("Unauthorized request.")
    }

  } catch (error) {
    res.status(400).send("Invalid token.")
  }

  next()
}

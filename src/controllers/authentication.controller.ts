import { RequestHandler } from 'express'
import authenticationModel from '../models/authentication.model'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import dotenv from 'dotenv'
dotenv.config()

export const register: RequestHandler = async (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, email, password } = req.body

  const oldUser = await authenticationModel.findOne({ email })

  if (oldUser) {
    return res.status(409).json({ message: "User already exists, please login." })
  }

  const encryptedPassword = await bcrypt.hash(password, 10)

  const user = await authenticationModel.create({
    username: username,
    email: email.toLowerCase(),
    password: encryptedPassword
  })

  res.status(201).json({ message: "User registered.", user: user })
}

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body

  if (!(email && password)) {
    return res.status(400).json({ message: "You must enter a valid value for every fields." })
  }

  const user = await authenticationModel.findOne({ email })

  if (user && await bcrypt.compare(password, user.password)) {
    let payload = { id: user.id, username: user.username }
    const token = generateAccessToken(payload)
    return res.status(200).json({ token: token })
  } else {
    return res.status(404).json({ message: "User doesn't exist, please verify your email or password." })
  }

}

export const generateAccessToken = (payload: object) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET as Secret, { expiresIn: process.env.JWT_EXPIRES })
}

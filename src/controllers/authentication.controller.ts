import { RequestHandler } from 'express'
import authenticationModel from '../models/authentication.model'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const register: RequestHandler = async (req, res, next) => {
  const { username, email, password } = req.body

  if (!(username && email && password)) {
    return res.status(400).json({ message: "You must enter a valid value for every fields." })
  }

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
    let payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn: "24h" })
    return res.status(200).header("Authorization", token).send({ "token": token })
  }

}

import { Router } from 'express'
import { login, register } from '../controllers/authentication.controller'
import { body } from 'express-validator'

const authenticationRouter = Router()

authenticationRouter.post('/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email.'),
    body('password').isStrongPassword().withMessage('Please enter a stronger password.')
  ], register)
authenticationRouter.post('/login', login)

export default authenticationRouter

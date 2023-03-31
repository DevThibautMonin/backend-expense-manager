import { Router } from 'express'
import { getUser, login, register } from '../controllers/authentication.controller'
import { body } from 'express-validator'

const authenticationRouter = Router()

authenticationRouter.post('/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email.'),
    body('password').isStrongPassword().withMessage('Please enter a stronger password.')
  ], register)
authenticationRouter.post('/login', login)
authenticationRouter.get('/:id', getUser)

export default authenticationRouter

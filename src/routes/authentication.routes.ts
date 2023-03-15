import { Router } from 'express'
import { register } from '../controllers/authentication.controller'

const authenticationRouter = Router()

authenticationRouter.post('/register', register)

export default authenticationRouter

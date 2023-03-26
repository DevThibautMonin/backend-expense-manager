import { Router } from 'express'
import { createExpense, deleteExpense, updateExpense, getExpensesByUser } from '../controllers/expense.controller'
import { verifyUserToken } from '../middlewares/authentication.middleware'

const expenseRouter = Router()

expenseRouter.post('/', verifyUserToken, createExpense)
expenseRouter.get('/:userId/:category', verifyUserToken, getExpensesByUser)
expenseRouter.put('/:id', verifyUserToken, updateExpense)
expenseRouter.delete('/:id', verifyUserToken, deleteExpense)

export default expenseRouter

import { Router } from 'express'
import { createExpense, deleteExpense, getExpenses, updateExpense, getExpensesByUser } from '../controllers/expense.controller'
import { verifyUserToken } from '../middlewares/authentication.middleware'

const expenseRouter = Router()

expenseRouter.post('/', verifyUserToken, createExpense)
expenseRouter.get('/', verifyUserToken, getExpenses)
expenseRouter.get('/:userId', verifyUserToken, getExpensesByUser)
expenseRouter.put('/:id', verifyUserToken, updateExpense)
expenseRouter.delete('/:id', verifyUserToken, deleteExpense)

export default expenseRouter

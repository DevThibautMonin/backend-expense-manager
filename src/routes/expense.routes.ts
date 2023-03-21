import { Router } from 'express'
import { createExpense, deleteExpense, getExpenses, updateExpense, getExpensesByUser } from '../controllers/expense.controller'
import { verifyUserToken } from '../middlewares/authentication.middleware'

const expenseRouter = Router()

expenseRouter.post('/', createExpense)
expenseRouter.get('/', verifyUserToken, getExpenses)
expenseRouter.get('/:userId', verifyUserToken, getExpensesByUser)
expenseRouter.put('/:id', updateExpense)
expenseRouter.delete('/:id', deleteExpense)

export default expenseRouter

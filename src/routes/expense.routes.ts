import { Router } from 'express'
import { createExpense, deleteExpense, getExpenses, updateExpense } from '../controllers/expense.controller'

const expenseRouter = Router()

expenseRouter.post('/', createExpense)
expenseRouter.get('/', getExpenses)
expenseRouter.put('/:id', updateExpense)
expenseRouter.delete('/:id', deleteExpense)

export default expenseRouter

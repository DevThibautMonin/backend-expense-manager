import { RequestHandler } from 'express'
import expenseModel from '../models/expense.model'

export const getExpenses: RequestHandler = async (req, res, next) => {
  const expenses = await expenseModel.find()
  res.status(200).json(expenses)
}

export const createExpense: RequestHandler = async (req, res, next) => {
  const expense = await expenseModel.create({
    name: req.body.name,
    amount: req.body.amount,
    date: req.body.date
  })

  res.status(201).json({ message: "New expense has been created.", expense: expense })
}

export const updateExpense: RequestHandler = async (req, res, next) => {

  const expense = await expenseModel.findById(req.body.id)

  if (!expense) {
    res.status(400).json({ message: "This expense doesn't exist" })
  }

  const updatedExpense = await expenseModel.findByIdAndUpdate(expense, req.body, { new: true })

  res.status(201).json({ message: "Expense updated.", expense: expense })
}

export const deleteExpense: RequestHandler = async (req, res, next) => {

  const expense = await expenseModel.findById(req.body.id)

  if (!expense) {
    res.status(400).json({ message: "This expense doesn't exist" })
  }

  await expenseModel.findByIdAndDelete(expense)

  res.status(200).json({ message: `Expense with id ${req.params.id} has been deleted.` })

}

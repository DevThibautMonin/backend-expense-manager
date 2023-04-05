import { RequestHandler } from 'express'
import expenseModel from '../models/expense.model'

export const getExpensesByUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId
  const category = req.params.category

  let expenses
  
  if (category === "Default") {
    expenses = await expenseModel.find({ userId: userId })
  } else {
    expenses = await expenseModel.find({ userId: userId, category: category })
  }

  return res.status(200).json(expenses)
}

export const createExpense: RequestHandler = async (req, res, next) => {
  const expense = await expenseModel.create({
    title: req.body.title,
    amount: req.body.amount,
    date: new Date(req.body.date),
    userId: req.body.userId,
    category: req.body.category
  })

  res.status(201).json({ message: "New expense has been created.", expense: expense })
}

export const updateExpense: RequestHandler = async (req, res, next) => {

  const expense = await expenseModel.findById(req.params.id)

  if (!expense) {
    res.status(400).json({ message: "This expense doesn't exist" })
  }

  const updatedExpense = await expenseModel.findByIdAndUpdate(expense, req.body, { new: true })

  res.status(200).json({ message: "Expense updated.", expense: updatedExpense })
}

export const deleteExpense: RequestHandler = async (req, res, next) => {

  const expense = await expenseModel.findById(req.params.id)

  if (!expense) {
    res.status(400).json({ message: "This expense doesn't exist" })
  }

  await expenseModel.findByIdAndRemove(expense)

  res.status(200).json({ message: `Expense with id ${req.params.id} has been deleted.` })

}

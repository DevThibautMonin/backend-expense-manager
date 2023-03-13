import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number
    },
    date: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('expense', expenseSchema)

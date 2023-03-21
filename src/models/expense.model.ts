import mongoose, { Schema } from 'mongoose'

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
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    category: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('expense', expenseSchema)

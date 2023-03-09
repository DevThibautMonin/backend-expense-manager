import mongoose from "mongoose"

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URL as string)
    console.log('Connected to Mongo')
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

export default connectDB

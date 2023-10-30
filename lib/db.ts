import mongoose from "mongoose"
let isConnected = false
export const connectToDb = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) return console.log('MongoDB has already connected')

  try {
    mongoose.connect(process.env.MONGO_URI!)
    isConnected = true
  } catch (error) {
    console.log('An error while connection to MongoDB:', error)
  }
}

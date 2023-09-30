import mongoose from "mongoose"

export const connectMongoDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!)
  } catch (error) {
    console.log('An error while connection to MongoDB:', error)
  }
}

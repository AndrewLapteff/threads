import mongoose, { Schema, models } from "mongoose"

const userSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread'
    }
  ],
  onboarded: { type: Boolean, default: false }

}, { timestamps: true })

const User = models.User || mongoose.model('User', userSchema)
export default User
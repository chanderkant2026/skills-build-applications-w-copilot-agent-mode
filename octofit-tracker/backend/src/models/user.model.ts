import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  role: 'athlete' | 'coach' | 'admin'
  team?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
export default User

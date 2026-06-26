import mongoose, { Document, Schema } from 'mongoose'

export interface ITeam extends Document {
  name: string
  description: string
  members: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
)

const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema)
export default Team

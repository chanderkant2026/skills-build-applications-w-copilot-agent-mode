import mongoose, { Document, Schema } from 'mongoose'

export interface IWorkoutExercise {
  name: string
  sets: number
  reps: number
  durationMinutes: number
}

export interface IWorkout extends Document {
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exercises: IWorkoutExercise[]
  team?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const workoutExerciseSchema = new Schema<IWorkoutExercise>(
  {
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    durationMinutes: { type: Number, required: true }
  },
  { _id: false }
)

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    exercises: { type: [workoutExerciseSchema], default: [] },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
)

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema)
export default Workout

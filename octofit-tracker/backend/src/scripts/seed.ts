import dotenv from 'dotenv'
import { connectToDatabase } from '../database'
import Activity from '../models/activity.model'
import LeaderboardEntry from '../models/leaderboard.model'
import Team from '../models/team.model'
import User from '../models/user.model'
import Workout from '../models/workout.model'

// Seed the octofit_db database with test data
async function seed() {
  dotenv.config()

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'
  await connectToDatabase(mongoUri)
  console.log('Connected to MongoDB for seeding:', mongoUri)

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({})
  ])

  const users = await User.create([
    { name: 'Ava Matthews', email: 'ava@example.com', role: 'athlete' },
    { name: 'Noah Patel', email: 'noah@example.com', role: 'athlete' },
    { name: 'Mia Chen', email: 'mia@example.com', role: 'coach' }
  ])

  const teams = await Team.create([
    { name: 'Marathon Masters', description: 'Endurance athletes training for long-distance events.', members: [users[0]._id] },
    { name: 'Strength Squad', description: 'Powerlifting and strength conditioning crew.', members: [users[1]._id] }
  ])

  const workouts = await Workout.create([
    {
      name: 'Morning Run',
      description: 'A steady-paced 5K run to build endurance.',
      difficulty: 'beginner',
      exercises: [
        { name: 'Warm-up jog', sets: 1, reps: 1, durationMinutes: 10 },
        { name: 'Run', sets: 1, reps: 1, durationMinutes: 30 }
      ],
      team: teams[0]._id
    },
    {
      name: 'Strength Circuit',
      description: 'High-intensity circuit training for muscle power.',
      difficulty: 'intermediate',
      exercises: [
        { name: 'Squats', sets: 4, reps: 10, durationMinutes: 15 },
        { name: 'Deadlifts', sets: 4, reps: 8, durationMinutes: 15 }
      ],
      team: teams[1]._id
    }
  ])

  const activities = await Activity.create([
    {
      user: users[0]._id,
      type: 'Running',
      durationMinutes: 42,
      caloriesBurned: 520,
      date: new Date(),
      notes: 'Morning tempo run with hill intervals.'
    },
    {
      user: users[1]._id,
      type: 'Strength Training',
      durationMinutes: 65,
      caloriesBurned: 610,
      date: new Date(),
      notes: 'Focus on lower body strength and form.'
    }
  ])

  const leaderboardEntries = await LeaderboardEntry.create([
    { user: users[0]._id, team: teams[0]._id, points: 1460, rank: 1 },
    { user: users[1]._id, team: teams[1]._id, points: 1375, rank: 2 }
  ])

  console.log('Seeded users:', users.length)
  console.log('Seeded teams:', teams.length)
  console.log('Seeded workouts:', workouts.length)
  console.log('Seeded activities:', activities.length)
  console.log('Seeded leaderboard entries:', leaderboardEntries.length)

  await process.exit(0)
}

seed().catch((error) => {
  console.error('Seed script failed:', error)
  process.exit(1)
})

import express from 'express'
import dotenv from 'dotenv'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'
import { connectToDatabase } from './database'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const baseApiPath = '/api'
const codespaceName = process.env.CODESPACE_NAME
const apiHost = codespaceName ? `https://${codespaceName}-8000.githubpreview.dev` : `http://localhost:${port}`
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'

app.use(express.json())
app.use(`${baseApiPath}/users`, usersRouter)
app.use(`${baseApiPath}/teams`, teamsRouter)
app.use(`${baseApiPath}/activities`, activitiesRouter)
app.use(`${baseApiPath}/leaderboard`, leaderboardRouter)
app.use(`${baseApiPath}/workouts`, workoutsRouter)

app.get(`${baseApiPath}/health`, (_req, res) => {
  res.json({ status: 'ok', service: 'OctoFit Tracker backend', apiHost })
})

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log(`MongoDB connected: ${mongoUri}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }
  console.log(`Server running on ${apiHost}`)
})

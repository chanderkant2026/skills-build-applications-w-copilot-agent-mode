import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit'

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'OctoFit Tracker backend' })
})

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log(`MongoDB connected: ${mongoUri}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }
  console.log(`Server running on http://localhost:${port}`)
})

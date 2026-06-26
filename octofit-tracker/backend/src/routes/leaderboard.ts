import { Router } from 'express'
import LeaderboardEntry from '../models/leaderboard.model'

const router = Router()

router.get('/', async (_req, res) => {
  const rankings = await LeaderboardEntry.find().populate('user team').sort({ rank: 1 }).lean()
  res.json({ message: 'Leaderboard', rankings })
})

export default router

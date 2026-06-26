import { Router } from 'express'
import Activity from '../models/activity.model'

const router = Router()

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean()
  res.json({ message: 'List activities', activities })
})

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body)
  res.status(201).json({ message: 'Create activity', activity })
})

export default router

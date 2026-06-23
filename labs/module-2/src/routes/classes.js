import { Router } from 'express'

const router = Router()

router.post('/', (_req, res) => {
  res.status(501).json({ error: 'Not implemented — use Copilot to build POST /classes' })
})

export default router

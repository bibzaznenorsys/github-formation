import { Router } from 'express'
import { sendError } from '../middleware/errors.js'
import { saveClass } from '../store.js'
import { validateClass } from '../validators.js'

const router = Router()

router.post('/', (req, res) => {
  const validation = validateClass(req.body)

  if (!validation.valid) {
    return sendError(res, 400, validation.error)
  }

  const created = saveClass(validation.data)
  return res.status(201).json(created)
})

export default router

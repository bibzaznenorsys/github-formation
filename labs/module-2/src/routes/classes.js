import { Router } from 'express'
import { sendError } from '../middleware/errors.js'
import { hasClass, saveClass } from '../store.js'
import { validateClass } from '../validators.js'

const router = Router()

router.post('/', (req, res) => {
  const validation = validateClass(req.body)

  if (!validation.valid) {
    return sendError(res, 400, validation.error)
  }

  if (hasClass(validation.data.classCode)) {
    return sendError(res, 409, 'Class already exists')
  }

  const created = saveClass(validation.data)
  return res.status(201).json(created)
})

export default router

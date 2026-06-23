import { Router } from 'express'
import { sendError } from '../middleware/errors.js'
import { saveStudent } from '../store.js'
import { validateStudent } from '../validators.js'

const router = Router()

router.post('/', (req, res) => {
  const validation = validateStudent(req.body)

  if (!validation.valid) {
    return sendError(res, 400, validation.error)
  }

  const created = saveStudent(validation.data)
  return res.status(201).json(created)
})

export default router

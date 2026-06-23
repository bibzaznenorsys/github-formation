import { Router } from 'express'
import { sendError } from '../middleware/errors.js'
import { hasStudent, saveStudent } from '../store.js'
import { validateStudent } from '../validators.js'

const router = Router()

router.post('/', (req, res) => {
  const validation = validateStudent(req.body)

  if (!validation.valid) {
    return sendError(res, 400, validation.error)
  }

  if (hasStudent(validation.data.studentId)) {
    return sendError(res, 409, 'Student already exists')
  }

  const created = saveStudent(validation.data)
  return res.status(201).json(created)
})

export default router

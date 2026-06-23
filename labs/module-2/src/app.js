import express from 'express'
import studentsRouter from './routes/students.js'
import classesRouter from './routes/classes.js'

export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', module: 2 })
  })

  app.use('/students', studentsRouter)
  app.use('/classes', classesRouter)
  return app
}

import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { resetStore } from '../src/store.js'

describe('step 03 — POST /classes', () => {
  beforeEach(() => {
    resetStore()
  })

  it('creates a class with 201', async () => {
    const app = createApp()
    const payload = {
      classCode: 'MATH-8A',
      teacher: 'Mr. Karim',
      room: 'B12',
    }

    const response = await request(app).post('/classes').send(payload)

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject(payload)
  })

  it('returns 400 for invalid class payload', async () => {
    const app = createApp()
    const response = await request(app).post('/classes').send({ classCode: 'MATH-8A' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })
})

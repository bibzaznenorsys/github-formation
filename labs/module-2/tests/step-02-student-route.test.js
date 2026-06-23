import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { resetStore } from '../src/store.js'

describe('step 02 — POST /students', () => {
  beforeEach(() => {
    resetStore()
  })

  it('creates a student with 201', async () => {
    const app = createApp()
    const payload = {
      studentId: 'STD-3007',
      fullName: 'Sara Idrissi',
      email: 'sara.idrissi@school.edu',
    }

    const response = await request(app).post('/students').send(payload)

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject(payload)
  })

  it('returns 400 for invalid student payload', async () => {
    const app = createApp()
    const response = await request(app).post('/students').send({ studentId: 'STD-1' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })
})

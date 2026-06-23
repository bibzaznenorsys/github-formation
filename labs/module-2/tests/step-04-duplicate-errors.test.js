import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { resetStore } from '../src/store.js'

describe('step 04 — duplicate errors', () => {
  beforeEach(() => {
    resetStore()
  })

  it('returns 409 when student already exists', async () => {
    const app = createApp()
    const payload = {
      studentId: 'STD-3007',
      fullName: 'Sara Idrissi',
      email: 'sara.idrissi@school.edu',
    }

    await request(app).post('/students').send(payload)
    const duplicate = await request(app).post('/students').send(payload)

    expect(duplicate.status).toBe(409)
    expect(duplicate.body).toEqual({ error: 'Student already exists' })
  })

  it('returns 409 when class already exists', async () => {
    const app = createApp()
    const payload = {
      classCode: 'MATH-8A',
      teacher: 'Mr. Karim',
      room: 'B12',
    }

    await request(app).post('/classes').send(payload)
    const duplicate = await request(app).post('/classes').send(payload)

    expect(duplicate.status).toBe(409)
    expect(duplicate.body).toEqual({ error: 'Class already exists' })
  })

  it('uses unified error format for validation failures', async () => {
    const app = createApp()
    const response = await request(app).post('/students').send({})

    expect(response.status).toBe(400)
    expect(Object.keys(response.body)).toEqual(['error'])
    expect(typeof response.body.error).toBe('string')
  })
})

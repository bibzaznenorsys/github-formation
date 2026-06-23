import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { resetStore } from '../src/store.js'

describe('step 05 — integration', () => {
  beforeEach(() => {
    resetStore()
  })

  it('onboards a student and a class end-to-end', async () => {
    const app = createApp()

    const studentResponse = await request(app).post('/students').send({
      studentId: 'STD-3007',
      fullName: 'Sara Idrissi',
      email: 'sara.idrissi@school.edu',
    })

    const classResponse = await request(app).post('/classes').send({
      classCode: 'MATH-8A',
      teacher: 'Mr. Karim',
      room: 'B12',
    })

    expect(studentResponse.status).toBe(201)
    expect(classResponse.status).toBe(201)
  })

  it('LAB-NOTES.md exists and has learner notes', () => {
    const notesPath = resolve(process.cwd(), 'LAB-NOTES.md')
    expect(existsSync(notesPath)).toBe(true)

    const content = readFileSync(notesPath, 'utf8')
    expect(content.trim().length).toBeGreaterThan(20)
  })
})

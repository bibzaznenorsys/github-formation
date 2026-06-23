import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'

describe('step 00 — intro smoke test', () => {
  it('GET /health returns ok', async () => {
    const app = createApp()
    const response = await request(app).get('/health')

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('ok')
    expect(response.body.module).toBe(2)
  })
})

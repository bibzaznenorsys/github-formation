import { describe, expect, it } from 'vitest'
import { validateClass, validateStudent } from '../src/validators.js'

describe('step 01 — schemas', () => {
  it('accepts a valid student payload', () => {
    const result = validateStudent({
      studentId: 'STD-3007',
      fullName: 'Sara Idrissi',
      email: 'sara.idrissi@school.edu',
    })

    expect(result.valid).toBe(true)
    expect(result.data.studentId).toBe('STD-3007')
  })

  it('rejects student payload with missing fields', () => {
    const result = validateStudent({ studentId: 'STD-1' })
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/missing/i)
  })

  it('rejects invalid student email', () => {
    const result = validateStudent({
      studentId: 'STD-3007',
      fullName: 'Sara Idrissi',
      email: 'not-an-email',
    })

    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/email/i)
  })

  it('accepts a valid class payload', () => {
    const result = validateClass({
      classCode: 'MATH-8A',
      teacher: 'Mr. Karim',
      room: 'B12',
    })

    expect(result.valid).toBe(true)
  })

  it('rejects class payload with missing fields', () => {
    const result = validateClass({ classCode: 'MATH-8A' })
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/missing/i)
  })
})

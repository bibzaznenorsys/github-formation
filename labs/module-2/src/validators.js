
export function validateStudent(_payload) {
  if (!_payload || typeof _payload !== 'object') {
    return { valid: false, error: 'Payload must be a valid object' }
  }

  const { name, email, studentId } = _payload

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required and must be a non-empty string' }
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return { valid: false, error: 'Email is required and must be a valid email address' }
  }

  if (!studentId || typeof studentId !== 'string' || studentId.trim().length === 0) {
    return { valid: false, error: 'Student ID is required and must be a non-empty string' }
  }

  return { valid: true }
}
/*
validate payload first,
then validate each field, and return an object with a valid boolean and an error message if invalid.
*/
export function validateClass(_payload) {
  if (!_payload || typeof _payload !== 'object') {
    return { valid: false, error: 'Payload must be a valid object' }
  }

  const { name, instructor, students } = _payload

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required and must be a non-empty string' }
  }

  if (!instructor || typeof instructor !== 'string' || instructor.trim().length === 0) {
    return { valid: false, error: 'Instructor is required and must be a non-empty string' }
  }

  if (!Array.isArray(students)) {
    return { valid: false, error: 'Students is required and must be an array' }
  }

  return { valid: true }
}

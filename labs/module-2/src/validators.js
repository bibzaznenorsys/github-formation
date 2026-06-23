/*
PSEUDOCODE PLAN
1) For validateStudent:
   - Check payload is an object.
   - Read studentId, fullName (fallback to name), and email.
   - Build a list of missing required fields.
   - If any missing fields exist, return a "Missing required field(s): ..." error.
   - Validate email format.
   - Return { valid: true, data: { ...normalized fields } }.

2) For validateClass:
   - Check payload is an object.
   - Read classCode (fallback to name), teacher (fallback to instructor), room, and students.
   - Build a list of missing required fields:
     - classCode required
     - teacher required
     - require at least room (string) or students (array) for compatibility
   - If missing fields exist, return a "Missing required field(s): ..." error.
   - If students is provided but not an array, return a students-array error.
   - Return { valid: true, data: { ...normalized fields } }.
*/

export function validateStudent(_payload) {
  if (!_payload || typeof _payload !== 'object') {
    return { valid: false, error: 'Payload must be a valid object' }
  }

  const studentId = _payload.studentId
  const fullName = _payload.fullName ?? _payload.name
  const email = _payload.email

  const missingFields = []

  if (!studentId || typeof studentId !== 'string' || studentId.trim().length === 0) {
    missingFields.push('studentId')
  }

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
    missingFields.push('fullName')
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    missingFields.push('email')
  }

  if (missingFields.length > 0) {
    return { valid: false, error: `Missing required field(s): ${missingFields.join(', ')}` }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Email is required and must be a valid email address' }
  }

  return {
    valid: true,
    data: {
      studentId: studentId.trim(),
      fullName: fullName.trim(),
      email: email.trim(),
    },
  }
}

/*
validate payload first,
then validate each field, and return an object with a valid boolean and an error message if invalid.
*/
export function validateClass(_payload) {
  if (!_payload || typeof _payload !== 'object') {
    return { valid: false, error: 'Payload must be a valid object' }
  }

  const classCode = _payload.classCode ?? _payload.name
  const teacher = _payload.teacher ?? _payload.instructor
  const room = _payload.room
  const students = _payload.students

  const missingFields = []

  if (!classCode || typeof classCode !== 'string' || classCode.trim().length === 0) {
    missingFields.push('classCode')
  }

  if (!teacher || typeof teacher !== 'string' || teacher.trim().length === 0) {
    missingFields.push('teacher')
  }

  const hasRoom = typeof room === 'string' && room.trim().length > 0
  const hasStudents = Array.isArray(students)

  if (!hasRoom && !hasStudents) {
    missingFields.push('room')
  }

  if (missingFields.length > 0) {
    return { valid: false, error: `Missing required field(s): ${missingFields.join(', ')}` }
  }

  if (students !== undefined && !Array.isArray(students)) {
    return { valid: false, error: 'Students is required and must be an array' }
  }

  return {
    valid: true,
    data: {
      classCode: classCode.trim(),
      teacher: teacher.trim(),
      ...(hasRoom ? { room: room.trim() } : {}),
      ...(hasStudents ? { students } : {}),
    },
  }
}
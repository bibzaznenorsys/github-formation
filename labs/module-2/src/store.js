const students = new Map()
const classes = new Map()

export function resetStore() {
  students.clear()
  classes.clear()
}

export function getStudent(studentId) {
  return students.get(studentId)
}

export function saveStudent(student) {
  students.set(student.studentId, student)
  return student
}

export function hasStudent(studentId) {
  return students.has(studentId)
}

export function getClass(classCode) {
  return classes.get(classCode)
}

export function saveClass(clazz) {
  classes.set(clazz.classCode, clazz)
  return clazz
}

export function hasClass(classCode) {
  return classes.has(classCode)
}

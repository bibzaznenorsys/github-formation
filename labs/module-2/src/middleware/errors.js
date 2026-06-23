export function errorBody(message) {
  return { error: message }
}

export function sendError(res, status, message) {
  return res.status(status).json(errorBody(message))
}

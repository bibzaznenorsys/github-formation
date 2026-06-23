import { createApp } from './app.js'

const app = createApp()
const port = process.env.PORT ?? 3002

app.listen(port, () => {
  console.log(`Module 2 lab server listening on http://localhost:${port}`)
})

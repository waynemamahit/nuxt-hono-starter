import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger());

// Basic route
app.get('/hello', (c) => {
  return c.json({ message: 'Hello Hono with Nuxt!' })
})

// Dynamic route
app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ userId: id })
})

// POST route
app.post('/users', async (c) => {
  const body = await c.req.json()
  return c.json({ received: body }, 201)
})

export default app
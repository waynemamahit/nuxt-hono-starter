import honoApp from '..'

export default defineEventHandler(async (event) => {
  // Convert Nuxt event to Hono request
  const response = await honoApp.fetch(
    event.node.req as unknown as Request,
    event.node.res
  )
  
  return response
})
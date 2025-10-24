// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  routeRules: {
    // Apply CORS headers to specific routes (e.g., your API routes)
    '/api/**': {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      },
    },
    // You can also add CORS headers to static assets if needed
    '/public/**': {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },

  nitro: {
    preset: "cloudflare_module",

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },
  },

  modules: ["nitro-cloudflare-dev"]
})
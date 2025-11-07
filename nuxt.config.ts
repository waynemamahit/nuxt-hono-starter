import type { Nitro } from 'nitropack';
import Aura from '@primeuix/themes/aura';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nitro-cloudflare-dev',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@primevue/nuxt-module',
  ],
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  typescript: {
    tsConfig: {
      compilerOptions: {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
      },
    },
  },

  routeRules: {
    // Apply CORS headers to specific routes (e.g., your API routes)
    '/api/**': {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept, Authorization',
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
    preset: 'cloudflare_module',

    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  hooks: {
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },

  compatibilityDate: '2025-07-15',

  i18n: {
    baseUrl: '/',
    locales: [{ code: 'en', language: 'en-US' }],
    defaultLocale: 'en',
  },
  vite: {
    plugins: [tailwindcss()],
  },

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
    },
  },
});

<script setup lang="ts">
const i18nHead = useLocaleHead();

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang,
  },
  title: 'Nuxt Hono Starter Project',
  meta: [
    {
      name: 'description',
      content:
        'A minimal starter project for building Nuxt applications with Hono.',
    },
  ],
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Skip to main content link for accessibility -->
    <a
      href="#main-content"
      class="absolute -top-10 left-1.5 bg-black text-white px-2 py-2 no-underline z-100 focus:top-1.5"
    >
      Skip to main content
    </a>

    <!-- Header -->
    <Menubar :model="[]" role="banner" class="bg-primary! border-0">
      <template #start>
        <span
          class="text-xl font-semibold"
          aria-label="Nuxt-Hono Starter Homepage"
        >
          Nuxt-Hono Starter
        </span>
      </template>
      <template #end>
        <Button icon="pi pi-bars" rounded aria-label="Open navigation menu" />
      </template>
    </Menubar>

    <!-- Main Content -->
    <main
      id="main-content"
      class="flex-1 flex flex-col items-center gap-12 px-4 py-8"
      role="main"
    >
      <!-- Hero Section -->
      <section
        class="text-center py-12 max-w-3xl"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          class="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
        >
          Welcome to Nuxt-Hono Starter
        </h1>
        <p
          class="text-xl text-gray-600 mb-8 leading-relaxed"
          aria-describedby="hero-description"
        >
          A powerful starter template combining Nuxt 4, PrimeVue UI, and Hono
          for building modern web applications.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <Button
            size="large"
            aria-describedby="get-started-desc"
            class="bg-primary! px-6 py-3"
          >
            Get Started
          </Button>
          <Button
            severity="secondary"
            size="large"
            aria-describedby="learn-more-desc"
            class="px-6 py-3"
          >
            Learn More
          </Button>
        </div>
        <!-- Hidden descriptions for screen readers -->
        <div
          id="get-started-desc"
          class="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
          style="clip: rect(0, 0, 0, 0)"
        >
          Start building your application with this starter template
        </div>
        <div
          id="learn-more-desc"
          class="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
          style="clip: rect(0, 0, 0, 0)"
        >
          Read more about the features and setup of this starter
        </div>
      </section>

      <!-- Features Section -->
      <section
        class="w-full max-w-6xl px-4 py-8"
        aria-labelledby="features-heading"
      >
        <h2
          id="features-heading"
          class="text-3xl font-bold text-center mb-8 text-gray-900"
        >
          Key Features
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          <Card class="h-full p-4" role="listitem">
            <template #title>
              <h3 class="text-xl font-semibold">Nuxt 4</h3>
            </template>
            <template #content>
              <p class="text-gray-600 leading-relaxed">
                Modern Vue.js framework with SSR and SSG support.
              </p>
            </template>
          </Card>
          <Card class="h-full p-4" role="listitem">
            <template #title>
              <h3 class="text-xl font-semibold">PrimeVue UI</h3>
            </template>
            <template #content>
              <p class="text-gray-600 leading-relaxed">
                Beautiful, responsive components for rapid development.
              </p>
            </template>
          </Card>
          <Card class="h-full p-4" role="listitem">
            <template #title>
              <h3 class="text-xl font-semibold">Hono Backend</h3>
            </template>
            <template #content>
              <p class="text-gray-600 leading-relaxed">
                Lightweight, fast API server with Cloudflare integration.
              </p>
            </template>
          </Card>
        </div>
      </section>
    </main>

    <!-- Footer with Secondary Color -->
    <footer
      class="bg-secondary bg-slate-600 text-white text-center py-6 mt-auto border-t border-secondary-800"
      role="contentinfo"
    >
      <div>Built with ❤️ using Nuxt, PrimeVue, and Hono</div>
    </footer>
  </div>
</template>

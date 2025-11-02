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
  <q-layout view="lHh Lpr lFf">
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <q-header elevated class="bg-primary text-white" role="banner">
      <q-toolbar>
        <q-toolbar-title aria-label="Nuxt-Hono Starter Homepage"
          >Nuxt-Hono Starter</q-toolbar-title
        >
        <q-space />
        <q-btn flat dense round icon="menu" aria-label="Open navigation menu" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page
        id="main-content"
        class="flex flex-center column q-gutter-md"
        role="main"
      >
        <!-- Hero Section -->
        <section class="text-center q-pa-lg" aria-labelledby="hero-heading">
          <h1 id="hero-heading" class="text-h3 text-weight-bold q-mb-md">
            Welcome to Nuxt-Hono Starter
          </h1>
          <p
            class="text-h6 text-grey-7 q-mb-xl"
            aria-describedby="hero-description"
          >
            A powerful starter template combining Nuxt 4, Quasar UI, and Hono
            for building modern web applications.
          </p>
          <div class="q-gutter-sm">
            <q-btn
              color="primary"
              label="Get Started"
              size="lg"
              aria-describedby="get-started-desc"
            />
            <q-btn
              color="blue-grey-10"
              label="Learn More"
              size="lg"
              aria-describedby="learn-more-desc"
            />
          </div>
          <!-- Hidden descriptions for screen readers -->
          <div id="get-started-desc" class="sr-only">
            Start building your application with this starter template
          </div>
          <div id="learn-more-desc" class="sr-only">
            Read more about the features and setup of this starter
          </div>
        </section>

        <!-- Features Section -->
        <section class="q-pa-lg" aria-labelledby="features-heading">
          <h2 id="features-heading" class="text-h4 text-center q-mb-lg">
            Key Features
          </h2>
          <div class="row justify-center q-gutter-md" role="list">
            <div class="col-xs-12 col-sm-6 col-md-4" role="listitem">
              <q-card class="full-height">
                <q-card-section>
                  <h3 class="text-h6">Nuxt 4</h3>
                  <p class="text-subtitle2">
                    Modern Vue.js framework with SSR and SSG support.
                  </p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4" role="listitem">
              <q-card class="full-height">
                <q-card-section>
                  <h3 class="text-h6">Quasar UI</h3>
                  <p class="text-subtitle2">
                    Beautiful, responsive components for rapid development.
                  </p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4" role="listitem">
              <q-card class="full-height">
                <q-card-section>
                  <h3 class="text-h6">Hono Backend</h3>
                  <p class="text-subtitle2">
                    Lightweight, fast API server with Cloudflare integration.
                  </p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </section>
      </q-page>
    </q-page-container>

    <!-- Footer -->
    <q-footer
      class="bg-grey-8 text-white text-center q-pa-md"
      role="contentinfo"
    >
      <div>Built with ❤️ using Nuxt, Quasar, and Hono</div>
    </q-footer>
  </q-layout>
</template>

<style scoped>
/* Accessibility styles */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 6px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

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
  <!-- Skip to main content link for accessibility -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <v-app>
    <v-app-bar app color="primary" dark role="banner">
      <v-toolbar-title aria-label="Nuxt-Hono Starter Homepage"
        >Nuxt-Hono Starter</v-toolbar-title
      >
      <v-spacer />
      <v-btn
        variant="text"
        size="small"
        rounded
        icon="mdi-menu"
        aria-label="Open navigation menu"
      />
    </v-app-bar>

    <v-main>
      <v-container
        id="main-content"
        fluid
        class="d-flex flex-column align-center"
        role="main"
      >
        <!-- Hero Section -->
        <section class="text-center pa-4" aria-labelledby="hero-heading">
          <h1 id="hero-heading" class="text-h3 font-weight-bold mb-4">
            Welcome to Nuxt-Hono Starter
          </h1>
          <p
            class="text-h6 text-grey-darken-2 mb-12"
            aria-describedby="hero-description"
          >
            A powerful starter template combining Nuxt 4, Quasar UI, and Hono
            for building modern web applications.
          </p>
          <v-row dense justify="center" gap="2">
            <v-btn
              color="primary"
              size="x-large"
              aria-describedby="get-started-desc"
            >
              Get Started
            </v-btn>
            <v-btn
              color="blue-grey-darken-4"
              size="x-large"
              aria-describedby="learn-more-desc"
            >
              Learn More
            </v-btn>
          </v-row>
          <!-- Hidden descriptions for screen readers -->
          <div id="get-started-desc" class="sr-only">
            Start building your application with this starter template
          </div>
          <div id="learn-more-desc" class="sr-only">
            Read more about the features and setup of this starter
          </div>
        </section>

        <!-- Features Section -->
        <section class="pa-4" aria-labelledby="features-heading">
          <h2 id="features-heading" class="text-h4 text-center mb-6">
            Key Features
          </h2>
          <v-row justify="center" spacing="4" role="list">
            <v-col cols="12" sm="6" md="4" role="listitem">
              <v-card height="100%">
                <v-card-text>
                  <h3 class="text-h6">Nuxt 4</h3>
                  <p class="text-subtitle-2">
                    Modern Vue.js framework with SSR and SSG support.
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" role="listitem">
              <v-card height="100%">
                <v-card-text>
                  <h3 class="text-h6">Vuetify UI</h3>
                  <p class="text-subtitle-2">
                    Beautiful, responsive components for rapid development.
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" role="listitem">
              <v-card height="100%">
                <v-card-text>
                  <h3 class="text-h6">Hono Backend</h3>
                  <p class="text-subtitle-2">
                    Lightweight, fast API server with Cloudflare integration.
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </section>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer
      app
      class="bg-grey-darken-4 text-white text-center pa-3"
      role="contentinfo"
    >
      <div>Built with ❤️ using Nuxt, Quasar, and Hono</div>
    </v-footer>
  </v-app>
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

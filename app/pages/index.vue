<template>
  <q-page class="flex flex-center column q-gutter-md" role="main">
    <!-- Hero Section -->
    <section class="text-center q-pa-lg" aria-labelledby="hero-heading">
      <h1 id="hero-heading" class="text-h3 text-weight-bold q-mb-md">
        Welcome to Nuxt-Hono Starter
      </h1>
      <p
        class="text-h6 text-grey-7 q-mb-xl"
        aria-describedby="hero-description"
      >
        A powerful starter template combining Nuxt 4, Quasar UI, and Hono for
        building modern web applications.
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
        <q-btn
          to="/chat"
          color="secondary"
          label="Chat"
          size="lg"
          aria-describedby="chat-desc"
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
</template>

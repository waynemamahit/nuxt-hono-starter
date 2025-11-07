<script setup lang="ts">
import { Menu as IconMenu } from '@element-plus/icons-vue';
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
  <el-container class="bg-primary-700 flex flex-col min-h-screen">
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <el-header
      class="bg-primary-700! flex items-center h-16 shadow-md px-5"
      role="banner"
    >
      <div class="flex items-center w-full">
        <div
          class="text-xl font-medium"
          aria-label="Nuxt-Hono Starter Homepage"
        >
          Nuxt-Hono Starter
        </div>
        <div class="grow" />
        <el-button text :icon="IconMenu" aria-label="Open navigation menu" />
      </div>
    </el-header>

    <el-main id="main-content" role="main" class="p-5">
      <!-- Hero Section -->
      <section class="text-center py-10" aria-labelledby="hero-heading">
        <h1 id="hero-heading" class="text-4xl font-bold mb-4">
          Welcome to Nuxt-Hono Starter
        </h1>
        <p id="hero-description" class="text-lg text-gray-600 mb-8">
          A powerful starter template combining Nuxt 4, Element Plus UI, and
          Hono for building modern web applications.
        </p>
        <div class="space-x-4">
          <el-button
            size="large"
            class="bg-primary-700!"
            aria-describedby="get-started-desc"
          >
            Get Started
          </el-button>
          <el-button size="large" aria-describedby="learn-more-desc">
            Learn More
          </el-button>
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
      <section class="py-10" aria-labelledby="features-heading">
        <h2 id="features-heading" class="text-3xl text-center mb-8">
          Key Features
        </h2>
        <el-row :gutter="20" role="list">
          <el-col :xs="24" :sm="12" :md="8" role="listitem">
            <el-card class="h-full">
              <template #header>
                <h3 class="text-xl m-0">Nuxt 4</h3>
              </template>
              <p class="text-gray-600">
                Modern Vue.js framework with SSR and SSG support.
              </p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" role="listitem">
            <el-card class="h-full">
              <template #header>
                <h3 class="text-xl m-0">Element Plus UI</h3>
              </template>
              <p class="text-gray-600">
                Beautiful, responsive components for rapid development.
              </p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" role="listitem">
            <el-card class="h-full">
              <template #header>
                <h3 class="text-xl m-0">Hono Backend</h3>
              </template>
              <p class="text-gray-600">
                Lightweight, fast API server with Cloudflare integration.
              </p>
            </el-card>
          </el-col>
        </el-row>
      </section>
    </el-main>

    <!-- Footer -->
    <el-footer
      class="bg-gray-100 text-gray-600 text-center p-5"
      role="contentinfo"
    >
      <div>Built with ❤️ using Nuxt, Element Plus, and Hono</div>
    </el-footer>
  </el-container>
</template>

<style>
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

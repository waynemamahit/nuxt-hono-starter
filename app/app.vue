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
      <NuxtPage id="main-content" />
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

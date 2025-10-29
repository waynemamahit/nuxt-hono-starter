<script setup lang="ts">
useHead({
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
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

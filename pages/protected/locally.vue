<script setup lang="ts">
definePageMeta({
  middleware: 'protected',
});
</script>

<template>
  <div>
    I'm a secret! My protection works via the named `nuxt-auth` module
    middleware.
  </div>
</template>

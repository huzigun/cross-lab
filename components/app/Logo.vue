<script setup lang="ts">
const uiStore = useUiStore();
</script>

<template>
  <NuxtLink to="/">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#fff"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="mr-2 h-6 w-6"
    >
      <path
        d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
      />
    </svg>
  </NuxtLink>
</template>

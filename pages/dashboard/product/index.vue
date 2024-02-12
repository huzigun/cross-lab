<script lang="ts" setup>
definePageMeta({
  middleware: ['protected'],
});

const { data, pending, error } = useFetch<any[]>('/api/product/search', {
  lazy: true,
  default() {
    return [];
  },
});
</script>

<template>
  <div class="p-4 md:p-8 pt-6">
    <div class="flex items-center space-x-4" v-if="pending">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>
    <div v-else>
      <UButton to="/dashboard/product/new" icon="i-heroicons-plus-20-solid">
        Add New
      </UButton>
    </div>
  </div>
</template>

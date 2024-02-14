<script lang="ts" setup>
const route = useRoute();
const menus = useMenus();
const titles = usePageTitles(route.path, menus);

const currentTitle = computed(() => {
  if (!titles) return '';
  return titles[titles.length - 1].label; // 마지막 타이틀
});

const navs = titles.map((t) => {
  return {
    label: t.label.toUpperCase(),
  };
});
</script>

<template>
  <div class="py-5 flex justify-between items-center">
    <h2 class="text-dark dark:text-white/70 text-lg font-semibold">
      {{ currentTitle }}
    </h2>
    <UBreadcrumb
      :links="navs"
      :ui="{
        li: 'flex items-center gap-x-1.5 text-gray-500 dark:text-gray-400 text-xs leading-6 min-w-0',
      }"
    />
  </div>
</template>

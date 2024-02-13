<script lang="ts" setup>
// SCRIPT
const items = useMenus();
const uiStore = useUiStore();
</script>

<template>
  <nav
    class="pt-2 pb-10 space-y-1 overflow-x-hidden overflow-y-auto"
    @mouseenter="uiStore.openSideBar"
    @mouseleave="uiStore.closeSideBar"
  >
    <!-- <div class="py-2 px-7 text-white/30 text-[10px]">MAIN</div> -->
    <AppSidebarMenu :items="items" />
  </nav>
</template>

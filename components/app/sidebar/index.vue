<script lang="ts" setup>
import { SIDEBAR_FULL_WIDTH } from '~/stores/ui';

// SCRIPT
const items = useMenus();
const uiStore = useUiStore();
const user = useSupabaseUser();

const isHover = ref(false);

const handleMouseEnter = () => {
  isHover.value = true;
};

const handleMouseLeave = () => {
  isHover.value = false;
};

const sidebarWidth = computed(() => {
  if (isHover.value) {
    return SIDEBAR_FULL_WIDTH;
  }
  return uiStore.SIDE_BAR_WIDTH;
});

const sidebarCollapsed = computed(() => {
  return sidebarWidth.value !== SIDEBAR_FULL_WIDTH;
});
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 bg-indigo-900 shadow-lg transition-all duration-150"
    :style="{
      width: sidebarWidth + 'px',
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="h-14 border-b border-white/10 flex items-center px-4 justify-center gap-x-1 flex-nowrap"
    >
      <img src="~/assets/images/logo.svg" width="24" />
      <span
        v-show="sidebarWidth === SIDEBAR_FULL_WIDTH"
        class="text-white font-medium text-lg truncate"
      >
        Cross Lab
      </span>
    </div>

    <nav class="space-y-1 overflow-x-hidden overflow-y-auto py-4">
      <ClientOnly>
        <AppSidebarMenu
          :items="items"
          :sidebarWidth="sidebarWidth"
          :sidebarCollapsed="sidebarCollapsed"
        />
      </ClientOnly>
    </nav>
  </aside>
</template>

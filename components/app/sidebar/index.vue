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
    class="fixed inset-y-0 left-0 z-50 bg-[#111C43] shadow-lg transition-all duration-150 flex flex-col"
    :style="{
      width: sidebarWidth + 'px',
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="border-b border-white/10 px-4">
      <nuxt-link
        to="/"
        class="flex items-center justify-center gap-x-1 flex-nowrap h-14"
      >
        <img src="~/assets/images/logo.svg" width="24" />
        <span
          v-show="sidebarWidth === SIDEBAR_FULL_WIDTH"
          class="text-white font-medium text-lg truncate"
        >
          Cross Lab
        </span>
      </nuxt-link>
    </div>

    <nav class="space-y-1 overflow-x-hidden overflow-y-auto py-4 flex-1">
      <ClientOnly>
        <template #fallback>
          <div class="space-y-2 px-4 opacity-20">
            <USkeleton class="w-full h-6" v-for="i in 12" :key="`menu-${i}`" />
          </div>
        </template>
        <AppSidebarMenu
          :items="items"
          :sidebarWidth="sidebarWidth"
          :sidebarCollapsed="sidebarCollapsed"
        />
      </ClientOnly>
    </nav>
  </aside>
</template>

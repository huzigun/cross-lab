<script lang="ts" setup>
const uiStore = useUiStore();
</script>

<template>
  <div
    class="app_layout flex flex-col h-full min-h-screen"
    :style="{ '--side-bar-width': uiStore.SIDE_BAR_WIDTH + 'px' }"
  >
    <header
      class="app_header fixed inset-x-0 w-full max-w-full app_bg app_border_b z-40 app_transition"
      :style="{
        paddingInlineStart: 'var(--side-bar-width)',
      }"
    >
      <div
        class="pr-4 pl-3 flex items-center justify-between"
        :style="{ height: 'var(--header-height)' }"
      >
        <u-button
          :icon="
            uiStore.IS_SIDEBAR_COLLAPSED
              ? 'i-heroicons-x-mark-16-solid'
              : 'i-heroicons-bars-3-center-left-16-solid'
          "
          size="md"
          color="gray"
          square
          variant="ghost"
          @click="uiStore.toggleSideBarWidth"
        />
        <div class="flex">
          <AppUserNav />
        </div>
      </div>
    </header>

    <aside
      class="app_sidebar fixed left-0 inset-y-0 z-50 app_border_r app_transition"
      :style="{
        width: 'var(--side-bar-width)',
        backgroundColor: 'var(--side-bar-bg-color)',
      }"
    >
      <div
        class="app_transition border-b border-white/10 absolute left-0 top-0 z-10 w-full flex items-center justify-center"
        :style="{
          height: 'var(--header-height)',
          backgroundColor: 'var(--side-bar-bg-color)',
        }"
      >
        <AppLogo />
      </div>
      <div
        class="h-screen overflow-y-auto overflow-x-hidden"
        :style="{
          paddingTop: 'var(--header-height)',
        }"
      >
        <AppSidebar />
      </div>
    </aside>

    <div
      class="app_content app_transition"
      :style="{
        marginTop: 'var(--header-height)',
        marginLeft: 'var(--side-bar-width)',
      }"
    >
      <main class="px-6 pb-6">
        <slot />
      </main>
    </div>

    <footer
      class="app_bg app_footer app_transition mt-auto xl:ps-[15rem] font-normal font-inter bg-white text-defaultsize leading-normal text-[0.813] shadow-[0_0_0.4rem_rgba(0,0,0,0.1)] py-4 text-center"
    ></footer>
  </div>
</template>

<style lang="scss">
.app_bg {
  @apply bg-white dark:bg-body-dark;
}
.app_border_b {
  @apply border-b dark:border-white/10;
}
.app_border_r {
  @apply border-r dark:border-white/10;
}
.app_transition {
  @apply transition-all duration-150;
}
</style>

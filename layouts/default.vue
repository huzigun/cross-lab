<script lang="ts" setup>
const links = [
  {
    label: '대시보드',
    to: '/dashboard',
  },
  {
    label: '내 작업',
    to: '/dashboard/engineer',
  },
  {
    label: '프로젝트',
    to: '/dashboard/order',
  },
  {
    label: '필터',
    to: '/dashboard/product',
  },
];

const uiStore = useUiStore();
const user = useSupabaseUser();
</script>

<template>
  <div
    class="h-screen bg-white overflow-x-hidden relative overflow-y-auto flex flex-col transition-all duration-150"
    :style="{
      '--side-bar-width': uiStore.SIDE_BAR_WIDTH + 'px',
      paddingLeft: 'var(--side-bar-width)',
    }"
  >
    <div class="inset-x-0 top-0 bg-white sticky z-50">
      <header class="px-3 h-14 border-b flex items-center">
        <div class="flex-1">
          <UButton
            icon="i-ion-apps-sharp"
            size="lg"
            color="gray"
            square
            variant="ghost"
            :ui="{ rounded: 'rounded-full' }"
            @click="uiStore.toggleSideBarWidth"
          />
        </div>
        <div class="">
          <ClientOnly>
            <template #fallback>
              <USkeleton class="w-8 h-8 rounded-full" />
            </template>
            <UPopover :popper="{ placement: 'bottom-start' }" v-if="user">
              <UAvatar src="" :alt="user.user_metadata.nickname || 'C L'" />

              <template #panel>
                <div class="py-1.5 w-64 text-sm leading-8">
                  <div class="flex items-center gap-x-2 w-full">
                    <UAvatar
                      src=""
                      :alt="user.user_metadata.nickname || 'C L'"
                    />
                    <div>
                      <div class="text-white font-semibold text-sm">
                        {{ user.user_metadata.nickname }}
                      </div>
                      <div class="text-white/60 text-xs">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>

                  <div class="px-4 cursor-pointer hover:bg-gray-50">
                    Setting
                  </div>
                  <div class="px-4 cursor-pointer hover:bg-gray-50">
                    Sign out
                  </div>
                </div>
              </template>
            </UPopover>
          </ClientOnly>
        </div>
      </header>
    </div>

    <AppSidebar />

    <!-- <header
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
    </header> -->

    <!-- <aside
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
    </aside> -->

    <main class="flex-1 overflow-y-auto px-6 pb-6">
      <AppPageHeader />
      <slot />
      <div :style="{ height: '20000px' }"></div>
    </main>

    <footer
      class="h-9 border-t flex items-center justify-center text-xs bg-white"
    >
      <span class="opacity-40">Developed by Huzigun</span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  items: IMenu[];
}>();

const route = useRoute();
const currentPath = computed(() => route.path);
const uiStore = useUiStore();

const isCurrentPath = (path?: string) => {
  if (!path) return false;
  return currentPath.value.includes(path);
};
</script>

<template>
  <UAccordion
    :items="items"
    color="purple"
    variant="ghost"
    :ui="{ wrapper: 'flex flex-col gap-y-1' }"
  >
    <template #default="{ item, index, open }">
      <div class="px-3" :style="{ width: uiStore.SIDE_BAR_WIDTH + 'px' }">
        <button
          type="button"
          class="rounded-lg flex leading-snug text-white/50 text-[0.85rem] p-3 hover:bg-white/5 w-full text-left items-center font-semibold relative gap-x-3"
          :class="{
            'menu-active': isCurrentPath(item.to),
            'justify-center': uiStore.IS_SIDEBAR_COLLAPSED,
          }"
        >
          <UIcon :name="item.icon" v-if="item.icon" class="w-4 h-4" />
          <template v-if="!uiStore.IS_SIDEBAR_COLLAPSED">
            <span>{{ item.label }}</span>
            <UIcon
              name="i-heroicons-chevron-right-solid "
              class="transition-all absolute right-4 top-1/2 -translate-y-1/2"
              :class="{ 'rotate-90': open }"
            />
          </template>
        </button>
      </div>
    </template>

    <template #sub-menus="{ item }" v-if="!uiStore.IS_SIDEBAR_COLLAPSED">
      <ul
        v-if="!!item.submenus"
        class="sub-menu px-3"
        :style="{ width: uiStore.SIDE_BAR_WIDTH + 'px' }"
      >
        <li
          v-for="(subItem, subIndex) in item.submenus"
          :key="subIndex"
          class="pl-5"
        >
          <NuxtLink
            :to="subItem.to"
            class="block py-1.5 px-4 rounded-lg text-white/50 text-[0.78rem] hover:bg-white/5 transition-color before:rounded-full before:bg-white/30 before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:transform before:transition-all before:duration-300 before:ease-in-out before:delay-75 before:z-[-1] relative before:left-1"
          >
            <span>{{ subItem.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </UAccordion>
</template>

<style lang="scss">
.menu-active {
  @apply text-white bg-white/5;
}
.sub-menu {
  .router-link-active {
    @apply text-white before:bg-white;
  }
}
</style>

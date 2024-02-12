<script lang="ts" setup>
const username = ref('hunter');
const password = ref('hunter2');

const onSubmit = async () => {
  const result = await $fetch('/api/auth/login', {
    method: 'POST',
  });
  console.log(result);
};
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <LayoutHeader />
    <LayoutSidebar />
    <main
      class="flex-1 pt-16 w-full h-full overflow-x-hidden overflow-y-scroll"
    >
      <slot />
    </main>
    <!-- 
    <aside class="fixed top-0 left-0 h-screen z-40 bg-background pt-14">
      <div
        class="w-64 border-r h-full py-8 overflow-x-hidden overflow-y-auto"
      ></div>
    </aside>
    > -->
  </div>
</template>

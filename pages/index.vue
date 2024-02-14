<script lang="ts" setup>
definePageMeta({});

const test = async () => {
  console.log('test');
  try {
    const result = await $fetch('/api/test');
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const supabase = useSupabaseClient();
const test2 = async () => {
  try {
    // const result = await supabase.auth.updateUser({
    //   data: {
    //     nickname: '휴쥐군2',
    //   },
    // });
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <UButton @click="test2">테스트</UButton>
  </div>
</template>

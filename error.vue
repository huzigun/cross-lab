<script lang="ts" setup>
const props = defineProps<{
  error: {
    url: string;
    statusCode: string;
    statusMessage: string;
    message: string;
    stack: string;
  };
}>();
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center gap-6 p-8"
  >
    <span class="text-9xl text-primary">{{ error.statusCode }}</span>
    <span
      class="text-3xl font-semibold text-gray-800"
      v-if="error.statusCode === '404'"
    >
      페이지를 찾을 수 없습니다.
    </span>
    <span
      class="text-3xl font-semibold text-gray-800"
      v-if="error.statusCode && String(error.statusCode).startsWith('5')"
    >
      서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.
    </span>

    <details class="w-full">
      <summary>Stack Trace</summary>
      <h4>{{ error.message }}</h4>
      <div v-html="error.stack"></div>
    </details>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['protected'],
});

const { data, pending, error } = useFetch<any[]>('/api/order/search', {
  lazy: true,
  default() {
    return [];
  },
});

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'buyShop',
    label: '구매 매장',
  },
  {
    key: 'productName',
    label: '상품 이름',
  },
  {
    key: 'productOption',
    label: '상품 옵션',
  },
  {
    key: 'quantity',
    label: '주문 수량',
    class: 'w-24',
  },
  {
    key: 'status',
    label: '주문 상태',
  },
];
</script>

<template>
  <div class="p-4 md:p-8 pt-6 w-full">
    <div class="space-y-3" v-if="pending">
      <USkeleton class="h-7 w-96" />
      <USkeleton class="h-7 w-full" v-for="i in 12" :key="`skeleton-${i}`" />
    </div>
    <div class="w-full" v-else>
      <div class="mb-4">
        <UButton icon="i-heroicons-cloud-arrow-down">주문 수집</UButton>
      </div>
      <div class="overflow-auto w-full">
        <UTable :rows="data" :columns="columns" />
      </div>
    </div>
  </div>
</template>

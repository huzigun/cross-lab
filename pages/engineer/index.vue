<script lang="ts" setup>
definePageMeta({});

const { data, pending, error } = await useFetch<any[]>('/api/engineer/search', {
  lazy: true,
  key: 'engineer-list',
  default() {
    return [];
  },
});

const colums = computed(() => {
  return [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: '이름',
    },
    {
      key: 'number',
      label: '연락처',
    },
    {
      key: 'address',
      label: '주소',
    },
    ...(data.value.length > 0
      ? data.value[0].stockItems.map((stockItem: any) => ({
          key: stockItem.product.id,
          label: stockItem.product.name.substr(0, 7) + '...',
        }))
      : []),
    {
      key: 'createdAt',
      label: '등록일',
    },
    {
      key: 'actions',
    },
  ];
});
</script>

<template>
  <div>
    <div class="space-y-3" v-if="pending">
      <USkeleton class="h-7 w-96" />
      <USkeleton class="h-7 w-full" v-for="i in 12" :key="`skeleton-${i}`" />
    </div>
    <div v-else>
      <div class="mb-4">
        <UButton to="/engineer/new" icon="i-heroicons-plus-20-solid">
          기사 추가
        </UButton>
      </div>
      <UTable :rows="data" :columns="colums">
        <template #address-data="{ row }">
          {{ `${row.zipCode} ${row.address} ${row.addressDetail ?? ''}` }}
        </template>
        <template #createdAt-data="{ row }">
          {{ $dayjs(row.createdAt).format('YYYY-MM-DD') }}
        </template>
        <template #actions-data="{ row }">
          <UButton
            :to="`/engineer/${row.id}`"
            icon="i-heroicons-pencil-20-solid"
            size="xs"
            color="gray"
          >
            바로가기
          </UButton>
        </template>
      </UTable>
    </div>
  </div>
</template>

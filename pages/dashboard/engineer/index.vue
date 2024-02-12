<script lang="ts" setup>
definePageMeta({
  middleware: ['protected'],
});

const { data, pending, error } = await useFetch<any[]>('/api/engineer/search', {
  lazy: true,
  key: 'engineer-list',
  default() {
    return [];
  },
});

const colums = [
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
  {
    key: 'createdAt',
    label: '등록일',
  },
  {
    key: 'actions',
  },
];
</script>

<template>
  <div class="p-4 md:p-8 pt-6">
    <div class="space-y-3" v-if="pending">
      <USkeleton class="h-7 w-96" />
      <USkeleton class="h-7 w-full" v-for="i in 12" :key="`skeleton-${i}`" />
    </div>
    <div v-else>
      <div class="mb-4">
        <UButton to="/dashboard/engineer/new" icon="i-heroicons-plus-20-solid">
          Add new
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
          {{ row.id }}
        </template>
      </UTable>
    </div>
  </div>
</template>

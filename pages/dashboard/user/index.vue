<script lang="ts" setup>
definePageMeta({
  middlewear: ['protected'],
});

const { data, pending, error } = await useFetch<any[]>('/api/user/search', {
  lazy: true,
  default() {
    return [
      {
        id: 1,
        username: 'John Doe',
        nickname: 'John',
        role: 'admin',
      },
    ];
  },
});

const columns = [
  {
    key: 'username',
    label: '아이디',
  },
  {
    key: 'nickname',
    label: '닉네임',
  },
  {
    key: 'createdAt',
    label: '등록일',
  },
  {
    key: 'role',
    label: '권한',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];
const user = useUser();
const selected = ref<any[]>([]);
</script>

<template>
  <div class="flex-1 space-y-4 p-4 md:p-8 pt-6">
    <div class="flex items-center space-x-4" v-if="pending">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>
    <div v-else>
      <div class="py-4 flex justify-end">
        <UButton :trailing="false" icon="i-heroicons-plus-20-solid">
          Add New
        </UButton>
      </div>
      <UTable v-model="selected" :rows="data" :columns="columns">
        <template #createdAt-data="{ row }">
          <div>
            {{ $dayjs(row.createdAt).format('YYYY-MM-DD') }}
          </div>
        </template>
        <template #actions-data="{ row }">
          <!-- <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown> -->
          <div>
            {{ row.id }}
          </div>
        </template>
      </UTable>
    </div>
  </div>
</template>

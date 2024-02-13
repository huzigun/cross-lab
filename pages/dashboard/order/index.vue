<script lang="ts" setup>
import { OrderStatusArray } from '~/schema/order';
import type { Engineer } from '@prisma/client';

definePageMeta({
  middleware: ['protected'],
});

const route = useRoute();

const searchQuery = computed(() => {
  return {
    page: route.query.page,
    limit: route.query.limit,
    status: route.query.status ?? undefined,
    keyword: route.query.keyword,
  };
});
const { data, pending, refresh } = await useFetch<{
  total: number;
  items: any[];
}>('/api/order/search', {
  lazy: true,
  params: searchQuery,
  default() {
    return {
      total: 0,
      items: [],
    };
  },
});

const loading = ref(false);
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
  {
    key: 'last',
    label: '주문 상태 변경일',
  },
  {
    key: 'install.status',
    label: '설치 요청',
  },
  {
    key: 'actions',
    label: 'Action',
    class: 'w-24',
  },
];
const limits = [10, 20, 30, 50];
const page = ref(route.query.page ? Number(route.query.page) : 1);
const limit = ref(route.query.limit ? Number(route.query.limit) : limits[0]);
const selectedOrderStatus = ref(
  (typeof route.query.status === 'string'
    ? route.query.status.split(',').filter((el) => !!el)
    : route.query.status) || [],
);
const keyword = ref(route.query.keyword?.toString() ?? '');

const onSearch = async () => {
  const query = {
    page: page.value ? page.value : undefined,
    limit: limit.value ? limit.value : undefined,
    status:
      selectedOrderStatus.value.length > 0
        ? selectedOrderStatus.value
        : undefined,
    keyword: keyword.value ? keyword.value : undefined,
  };
  await navigateTo({
    path: route.path,
    query,
  });
  refresh();
};

const syncOrder = async () => {
  loading.value = true;
  try {
    await $fetch('/api/order/sync', {
      method: 'POST',
    });
    refresh();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const engineers = ref<Pick<Engineer, 'id' | 'name'>[]>([]);
onMounted(() => {
  $fetch('/api/engineer').then((data) => {
    engineers.value = data;
  });
});
</script>

<template>
  <div>
    <AppPageHeader />
    <UCard>
      <div class="space-y-3" v-if="pending">
        <USkeleton class="h-7 w-96" />
        <USkeleton class="h-7 w-full" v-for="i in 12" :key="`skeleton-${i}`" />
      </div>
      <div class="w-full" v-else>
        <div class="mb-4 flex justify-end gap-x-2">
          <UButton
            :loading="loading"
            icon="i-heroicons-cloud-arrow-down"
            @click="syncOrder"
          >
            주문 수집
          </UButton>
          <div class="flex-1"></div>
          <div class="w-[100px]">
            <USelect :loading="loading" v-model="limit" :options="limits" />
          </div>
          <div class="w-[240px]">
            <ClientOnly>
              <template #fallback>
                <USkeleton class="w-full h-8" />
              </template>
              <USelectMenu
                :loading="loading"
                v-model="selectedOrderStatus"
                :options="OrderStatusArray"
                multiple
                placeholder="Select Status"
              >
                <template #label>
                  <span v-if="selectedOrderStatus.length" class="truncate">
                    {{ selectedOrderStatus.join(', ') }}
                  </span>
                  <span v-else>Select Status</span>
                </template>
              </USelectMenu>
            </ClientOnly>
          </div>
          <div class="w-[240px]">
            <UInput
              :loading="loading"
              v-model.trim="keyword"
              placeholder="받는사람 이름, 주소, 전화번호 검색"
            />
          </div>
          <UButton @click="onSearch" :loading="loading">검색</UButton>
        </div>
        <div class="overflow-auto w-full">
          <UTable :rows="data.items" :columns="columns">
            <template #last-data="{ row }">
              {{ $dayjs(row.lastChangedDate).format('YYYY-MM-DD HH:mm') }}
            </template>
            <template #actions-data="{ row }">
              <OrderActions :order="row" :engineers="engineers" />
            </template>
          </UTable>
        </div>
      </div>
    </UCard>
  </div>
</template>

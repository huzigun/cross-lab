<script setup lang="ts">
import type { Order } from '@prisma/client';
const items = [
  [
    {
      label: '설치 요청',
      icon: 'i-heroicons-cog-8-tooth',
      click: () => {
        isOpenInstall.value = true;
      },
    },
  ],
];

const isOpenInstall = ref(false);
const openInstall = () => {
  isOpenInstall.value = true;
};
const props = defineProps<{
  order: Order;
  engineers: { id: string; name: string }[];
}>();

const toast = useToast();

const installTypes = [
  {
    label: '설치',
    value: 'INSTALL',
  },
  {
    label: '수리',
    value: 'REPAIR',
  },
  {
    label: '유지보수',
    value: 'MAINTENANCE',
  },
];
const selectEngineer = ref<string>();
const selectType = ref(installTypes[0].value);
const useStock = ref(true);
const loading = ref(false);

const onSubmit = async () => {
  if (!selectEngineer.value) {
    toast.add({
      title: '설치 담당자를 선택해주세요.',
    });
    return;
  }

  const data = {
    orderId: props.order.id,
    productId: props.order.productId,
    engineerId: selectEngineer.value,
    type: selectType.value,
    useStock: useStock.value,
  };

  try {
    loading.value = true;
    await $fetch('/api/order/install', {
      method: 'POST',
      body: data,
    });
    toast.add({
      title: '요청이 완료되었습니다.',
    });
    isOpenInstall.value = false;
  } catch (error) {
    console.dir(error);
    toast.add({
      title: '요청에 실패했습니다.',
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton
      variant="soft"
      color="white"
      size="sm"
      icon="i-heroicons-ellipsis-vertical"
    />
  </UDropdown>

  <UModal v-model="isOpenInstall">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h4>설치 요청하기</h4>
      </template>

      <div class="space-y-3">
        <USelectMenu
          v-model="selectEngineer"
          option-attribute="name"
          value-attribute="id"
          :options="engineers"
          placeholder="설치 담당자 선택"
          :loading="loading"
        />
        <USelectMenu
          v-model="selectType"
          :options="installTypes"
          value-attribute="value"
          placeholder="설치 담당자 선택"
          :loading="loading"
        />
        <div class="p-1">
          <UCheckbox
            v-model="useStock"
            color="primary"
            label="본사 재고 발송 여부"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-x-2">
          <UButton
            color="gray"
            size="sm"
            @click="() => (isOpenInstall = false)"
            :loading="loading"
          >
            취소
          </UButton>
          <UButton :loading="loading" size="sm" @click="onSubmit">요청</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

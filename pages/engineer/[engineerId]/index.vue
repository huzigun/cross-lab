<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import type { Engineer, StockItem, Product } from '@prisma/client';

import {
  createEngineerSchema,
  type CreateEngineerSchema,
} from '~/schema/engineer';

definePageMeta({
  validate(route) {
    // new 이거나 15자인 경우만 허용
    return (
      route.params.engineerId === 'new' || route.params.engineerId.length === 15
    );
  },
});

const toast = useToast();
const route = useRoute();

const { data, pending, error } = await useFetch<{
  engineer: Engineer;
  stockItems: (StockItem & { product: Product })[];
}>(`/api/engineer/${route.params.engineerId}`);

const loading = ref(false);
const state = ref({
  name: undefined,
  number: undefined,
  zipCode: undefined,
  address: undefined,
  addressDetail: undefined,
});

async function onSubmit(event: FormSubmitEvent<CreateEngineerSchema>) {
  const method = route.params.engineerId === 'new' ? 'POST' : 'PUT';

  try {
    loading.value = true;
    const result = await $fetch('/api/engineer', {
      method: 'POST',
      body: {
        ...event.data,
      },
    });

    toast.add({
      title: '등록 완료',
      icon: 'i-heroicons-check-badge',
      color: 'primary',
      description: result.message,
    });
    navigateTo('/engineer');
  } catch (error: any) {
    toast.add({
      title: '등록 실패',
      icon: 'i-heroicons-x-circle',
      color: 'red',
      description: error.data?.message ?? error.message,
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <UCard>
      <div class="grid grid-cols-2 gap-x-5">
        <div class="col-span-2 lg:col-span-1">
          <h4 class="font-semibold mb-4">설치기사 정보</h4>
          <UForm
            :schema="createEngineerSchema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <UFormGroup label="이름" name="name" required>
              <UInput v-model.trim="state.name" :loading="loading" />
            </UFormGroup>

            <UFormGroup label="전화번호" name="number" required>
              <UInput v-model.trim="state.number" :loading="loading" />
            </UFormGroup>

            <UFormGroup label="우편번호" name="zipCode" required>
              <UInput v-model.trim="state.zipCode" :loading="loading" />
            </UFormGroup>

            <UFormGroup label="주소" name="address" required>
              <UInput v-model.trim="state.address" :loading="loading" />
            </UFormGroup>

            <UFormGroup label="상세주소" name="addressDetail">
              <UInput v-model.trim="state.addressDetail" :loading="loading" />
            </UFormGroup>

            <UButton type="submit" :loading="loading">Submit</UButton>
          </UForm>
        </div>
        <div class="col-span-2 lg:col-span-1">
          <!-- <h4 class="font-semibold mb-4">제품별 재고</h4>
        asdasd -->
        </div>
      </div>
    </UCard>
  </div>
</template>

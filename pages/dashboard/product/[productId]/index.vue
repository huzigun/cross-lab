<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import {
  createProductSchema,
  type CreateProductSchema,
} from '~/schema/product';

definePageMeta({
  middleware: ['protected'],
  validate(route) {
    // new 이거나 15자인 경우만 허용
    return (
      route.params.productId === 'new' || route.params.productId.length === 15
    );
  },
});
const toast = useToast();
const loading = ref(false);

// const route = useRoute();

const state = ref({
  name: undefined,
  stock: 0,
  description: undefined,
  smartstoreProductId: undefined,
  coopangProductId: undefined,
  elevenProductId: undefined,
});

async function onSubmit(event: FormSubmitEvent<CreateProductSchema>) {
  // Do something with data
  console.log(event.data);
  loading.value = true;
  try {
    const result = await $fetch<{ message: string }>('/api/product', {
      method: 'POST',
      body: event.data,
    });

    toast.add({
      title: '등록 완료',
      icon: 'i-heroicons-check-badge',
      color: 'primary',
      description: result.message,
    });
    navigateTo('/dashboard/product');
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
    <AppPageHeader />
    <UCard>
      <div class="max-w-[500px]">
        <UForm
          :schema="createProductSchema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="상품명" name="name" required>
            <UInput
              v-model="state.name"
              placeholder="상품명을 입력해주세요."
              :loading="loading"
            />
          </UFormGroup>

          <UFormGroup label="재고" name="stock" required>
            <UInput
              v-model.number="state.stock"
              placeholder="재고를 입력해주세요."
              :loading="loading"
            />
          </UFormGroup>

          <UFormGroup label="설명" name="description">
            <UTextarea
              v-model="state.description"
              placeholder="간략한 설명을 입력해주세요."
              :loading="loading"
            />
          </UFormGroup>

          <UFormGroup label="스마트스토어 상품 ID" name="smartstoreProductId">
            <UInput
              v-model="state.smartstoreProductId"
              placeholder="스마트스토어 상품아이디를 입력해주세요."
              :loading="loading"
            />
          </UFormGroup>

          <UFormGroup label="쿠팡 상품 ID" name="coopangProductId">
            <UInput
              v-model="state.coopangProductId"
              placeholder="쿠팡 상품 아이디를 입력해주세요."
              :loading="loading"
            />
          </UFormGroup>

          <UFormGroup label="11번가 상품 ID" name="elevenProductId">
            <UInput
              v-model="state.elevenProductId"
              placeholder="11번가 상품 아이디를 입력해주세요."
              :loading="loading"
            />
          </UFormGroup>

          <UButton type="submit" :loading="loading">Submit</UButton>
        </UForm>
      </div>
    </UCard>
  </div>
</template>

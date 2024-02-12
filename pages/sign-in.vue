<script lang="ts" setup>
import { signInSchema, type signInSchemaType } from '~/schema/auth';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({
  layout: 'blank',
});

const toast = useToast();
const loading = ref(false);
const state = ref({
  username: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<signInSchemaType>) {
  // Do something with data
  console.log(event.data);
  loading.value = true;
  try {
    const result = await $fetch<{ message: string }>('/api/auth/login', {
      method: 'POST',
      body: event.data,
    });
    toast.add({
      title: '로그인 성공',
      icon: 'i-heroicons-check-badge',
      color: 'primary',
      description: result.message,
    });
    navigateTo('/dashboard');
  } catch (error: any) {
    toast.add({
      title: '로그인 실패',
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
  <div
    class="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
    >
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="mr-2 h-6 w-6"
        >
          <path
            d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
          />
        </svg>
        Logo
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;This library has saved me countless hours of work and helped
            me deliver stunning designs to my clients faster than ever
            before.&rdquo;
          </p>
          <footer class="text-sm">Sofia Davis</footer>
        </blockquote>
      </div>
    </div>
    <div class="p-4 lg:p-8 h-full flex items-center">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
      >
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <div>
          <UForm
            class="space-y-4"
            :schema="signInSchema"
            :state="state"
            @submit="onSubmit"
          >
            <UFormGroup label="Username" name="username">
              <UInput
                :loading="loading"
                v-model.trim="state.username"
                placeholder="Enter your username"
              />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput
                :loading="loading"
                v-model.trim="state.password"
                type="password"
                placeholder="Enter your password"
                autocomplete="off"
              />
            </UFormGroup>

            <UButton :loading="loading" block type="submit">Submit</UButton>
          </UForm>
        </div>
        <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking continue,
          <br />
          you agree to our
          <NuxtLink
            to="/"
            class="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </NuxtLink>
          and
          <NuxtLink
            to="/"
            class="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </NuxtLink>
          .
        </p>
      </div>
    </div>
  </div>
</template>

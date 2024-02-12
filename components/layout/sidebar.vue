<script lang="ts" setup>
import { Camera } from 'lucide-vue-next';
const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    title: 'Engineer',
    href: '/dashboard/engineer',
    icon: 'user',
    label: 'engineer',
  },
  {
    title: 'Product',
    href: '/dashboard/product',
    icon: 'employee',
    label: 'product',
  },
  {
    title: 'Order',
    href: '/dashboard/order',
    icon: 'profile',
    label: 'order',
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'profile',
    label: 'user',
  },
];
</script>

<template>
  <nav class="relative hidden h-screen border-r pt-16 lg:block w-72">
    <div class="space-y-4 py-4">
      <div class="px-3 py-2">
        <div class="space-y-1">
          <h2 class="mb-2 px-4 text-xl font-semibold tracking-tight">
            Overview
          </h2>
          <nav class="grid items-start gap-2">
            <NuxtLink
              v-for="(item, index) in navItems"
              :key="index"
              :to="item.disabled ? '/' : item.href"
            >
              <span
                class="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                :class="{
                  'cursor-not-allowed opacity-80': item.disabled,
                }"
              >
                <Camera />
                <span>{{ item.title }}</span>
              </span>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </nav>
</template>

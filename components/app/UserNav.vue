<script lang="ts" setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const items = [
  [
    {
      label: 'Profile',
      avatar: {
        src: '',
      },
      disabled: true,
    },
  ],
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      shortcuts: ['E'],
      disabled: true,
    },
    {
      label: 'Duplicate',
      icon: 'i-heroicons-document-duplicate-20-solid',
      shortcuts: ['D'],
      disabled: true,
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-left-start-on-rectangle-solid',
      click: async () => {
        try {
          await supabase.auth.signOut();
          await navigateTo('/sign-in');
        } catch (error) {
          console.error(error);
        }
      },
    },
  ],
];
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }" v-if="user">
    <div class="flex items-center gap-x-3 min-w-32">
      <UAvatar src="" :alt="user.user_metadata?.nickname || user.email" />
      <dl class="w-full">
        <dt class="font-semibold text-sm">
          {{ user.user_metadata?.nickname || user.email }}
        </dt>
        <dd class="text-xs text-dark/60">
          {{ user.email }}
        </dd>
      </dl>
    </div>
  </UDropdown>
</template>

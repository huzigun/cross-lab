<script lang="ts" setup>
// SCRIPT
const { data, pending } = await useFetch<{ id: string; username: string }>(
  '/api/auth/user',
  {
    lazy: true,
  },
);
// const test = async () => {
//   try {
//     console.log('test');
//     const result = await $fetch('/api/user/search');
//     console.log(result);
//   } catch (error) {
//     console.dir(error);
//   }
// };
</script>

<template>
  <div>
    asdasd ??
    <div v-if="data">id: {{ data.id }}</div>
    <!-- <UButton @click="test">asdasd</UButton> -->

    <!-- <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage src="" alt="" />
          <AvatarFallback>장</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium">휴쥐군</p>
          <p class="text-xs text-muted-foreground">huzigun</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>New Team</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu> -->
  </div>
</template>

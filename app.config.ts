export default defineAppConfig({
  ui: {
    strategy: 'override', // 기존 설정을 유지하면서 설정변경 및 추가
    primary: 'violet',
    button: {
      rounded: 'rounded',
      default: {
        loadingIcon: 'i-ion-load-c',
      },
    },
    card: {
      divide: 'divide-y divide-gray-100 dark:divide-gray-700',
      shadow: 'shadow_faint',
      header: {
        base: 'font-medium',
        padding: 'px-4 py-4 sm:px-6',
      },
      body: {
        padding: '',
      },
    },
    input: {
      rounded: 'rounded',
      default: {
        loadingIcon: 'i-ion-load-c',
      },
    },
    select: {
      rounded: 'rounded',
      default: {
        loadingIcon: 'i-ion-load-c',
      },
    },
    badge: {
      size: {
        '2xs': 'text-[10px] px-1.5 py-0.5',
      },
      variant: {
        subtle:
          'bg-{color}-500 dark:bg-{color}-400 bg-opacity-10 text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 ring-opacity-25 dark:ring-opacity-25',
      },
    },
    table: {
      // base: 'border border-gray-100 dark:border-gray-700 min-w-full table-fixed',
      // divide: 'divide-y divide-gray-100 dark:divide-gray-700',
      // thead: 'divide-y divide-gray-100 dark:divide-gray-700',
      // tbody: 'divide-y divide-gray-100 dark:divide-gray-700',
      th: {
        base: 'text-left rtl:text-right min-w-20',
        size: 'text-[0.85rem]',
        font: 'font-semibold',
        padding: 'py-3 px-3',
      },
      td: {
        base: 'whitespace-nowrap min-w-20',
        size: 'text-[0.813rem]',
        padding: 'py-3 px-3',
      },
    },
    notifications: {
      position: 'top-0 bottom-auto right-0 left-auto',
    },
    notification: {
      default: {
        timeout: 2500,
      },
      description:
        'mt-1 text-[13px] leading-4 text-gray-500 dark:text-gray-400',
    },
  },
});

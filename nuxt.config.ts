// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          as: 'style',
          href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
        },
      ],
    },
  },

  modules: ['@nuxt/ui', 'dayjs-nuxt'],

  build: {
    transpile: ['jsonwebtoken'],
  },

  ui: {
    /**
     * icon 설정 (https://icones.js.org/) default: heroicons
     * @see https://icones.js.org/collection/heroicons
     * @see https://icones.js.org/collection/ri
     * @see https://icones.js.org/collection/ion
     */
    icons: ['ri', 'ion'],
  },

  tailwindcss: {
    configPath: '~/tailwind.config.ts',
    cssPath: '~/assets/scss/tailwind.scss',
    viewer: false,
  },

  colorMode: {
    preference: 'light',
  },

  dayjs: {
    locales: ['ko', 'en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul',
  },
});

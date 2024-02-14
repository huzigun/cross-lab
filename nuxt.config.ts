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
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: ['@nuxt/ui', 'dayjs-nuxt', '@pinia/nuxt', '@nuxtjs/supabase', "@nuxt/image"],

  // build: {
  //   transpile: ['jsonwebtoken'],
  // },

  // ssr: false,

  css: ['~/assets/scss/app.scss'],

  supabase: {
    // redirect: false,
    redirectOptions: {
      login: '/sign-in',
      callback: '/',
      // exclude: [], // 제외할 페이지 경로
      // cookieRedirect: false, // 쿠키 리다이렉트 사용 여부
    },
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

  pinia: {
    storesDirs: ['./stores/**'],
  },
});
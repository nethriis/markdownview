// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: [
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxtjs/seo'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  site: {
    url: 'https://markdownview.com',
    name: 'MarkdownView',
    description: 'A simple, fast, and free markdown viewer.',
    defaultLocale: 'en'
  }
})

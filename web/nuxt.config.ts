// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src',
  devtools: { enabled: true },
  app: {
    baseURL: '/manager'
  },
  extends: ['@agtm/nuxt-layer-adminlte-primeface']
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode'],
  plugins: ['~/plugins/locally.js'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  colorMode: {
    classSuffix: 'hs-fsd',
  },
  ssr: false,
  vite: {
    build: {
      target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15'],
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: 'es2022',
      },
    },
  },
});

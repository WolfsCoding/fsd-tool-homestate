// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/color-mode", "@nuxtjs/supabase"],
    plugins: ["~/plugins/locally.js"],
    shadcn: {
        prefix: "",
        componentDir: "./components/ui",
    },
    colorMode: {
        classSuffix: "hs-fsd",
    },
    ssr: false,
    vite: {
        build: {
            target: ["es2022", "edge89", "firefox89", "chrome89", "safari15"],
        },
    },
    nitro: {
        esbuild: {
            options: {
                target: "es2022",
            },
        },
    },
    supabase: {
        redirect: false,
        key: process.env.SUPABASE_KEY,
        url: process.env.SUPABASE_URL,
    },
});

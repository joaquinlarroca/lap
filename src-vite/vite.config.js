import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";
import svgLoader from 'vite-svg-loader'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const configStoreKey = mode === 'development' ? 'configStore.debug' : 'configStore'

  return {
    plugins: [
      {
        name: 'config-store-key',
        transformIndexHtml(html) {
          return html.replaceAll('%CONFIG_STORE_KEY%', configStoreKey)
        },
      },
      vue(),
      mode === 'development' && vueDevTools(),
      tailwindcss(),
      svgLoader()
    ],
    server: {
      port: 3580
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      sourcemap: false,
    }
  }
});

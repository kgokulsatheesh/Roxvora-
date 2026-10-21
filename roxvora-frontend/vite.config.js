import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const src = (path) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': src('./src'),
      '@api': src('./src/api'),
      '@components': src('./src/components'),
      '@config': src('./src/config'),
      '@constants': src('./src/constants'),
      '@context': src('./src/context'),
      '@data': src('./src/data'),
      '@hooks': src('./src/hooks'),
      '@pages': src('./src/pages'),
      '@routes': src('./src/routes'),
      '@store': src('./src/store'),
      '@styles': src('./src/styles'),
      '@theme': src('./src/theme'),
      '@utils': src('./src/utils'),
      '@validations': src('./src/validations'),
    },
  },

  server: {
    open: true,
  },
})
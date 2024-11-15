import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({command, isPreview}) => {
  return ({
    plugins: [react()],
    base: (command === 'build' || isPreview) ? "/MTExplanation/" : "/",
    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve('index.html'),
          page: resolve('page.html'),
        }
      }
    }
  })
})
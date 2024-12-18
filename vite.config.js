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
          q1: resolve('q1.html'),
          q2: resolve('q2.html'),
          q3: resolve('q3.html')
        }
      }
    }
  })
})
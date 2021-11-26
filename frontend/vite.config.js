import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './index.js',
      name: 'murmur',
      fileName: (format) => `murmur.${format}.js`
    },
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], insertTypesEntry: true, exclude: ['src/**/*.test.*'] }),
  ],
  css: {
    postcss: { plugins: [tailwindcss, autoprefixer] },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JarvisUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `jarvis-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        assetFileNames: 'jarvis-ui[extname]',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})

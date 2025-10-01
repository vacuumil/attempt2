import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/api/avwx': {
        target: 'https://avwx.rest',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/avwx/, '')
      },
      '/api/checkwx': {
        target: 'https://api.checkwx.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/checkwx/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      external: []
    }
  }
});
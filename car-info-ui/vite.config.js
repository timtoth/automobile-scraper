import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [react(),tailwindcss()],
    server: {
      // 1. Define the proxy rule
      proxy: {
        '/api': {
          target: 'http://localhost:31002',
          changeOrigin: true,
        },
      }
    }
  }
})

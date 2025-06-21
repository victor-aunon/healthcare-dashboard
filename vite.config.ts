import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/app/routes',
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      app: path.resolve(__dirname, './src/app'),
      api: path.resolve(__dirname, './src/api'),
      domain: path.resolve(__dirname, './src/domain'),
      services: path.resolve(__dirname, './src/services'),
      application: path.resolve(__dirname, './src/application'),
      ui: path.resolve(__dirname, './src/ui'),
      hooks: path.resolve(__dirname, './src/hooks'),
    },
  },
})

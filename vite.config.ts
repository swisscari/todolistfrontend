import react from '@vitejs/plugin-react'
import { UserConfig, defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    open: true,
  },
} as UserConfig)

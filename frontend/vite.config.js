import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Windows' native file watcher throws EBUSY on newly added/locked files
    // (e.g. right after saving an image); polling avoids that crash.
    watch: {
      usePolling: true,
    },
  },
})

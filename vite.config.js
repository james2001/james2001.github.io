import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'global-builtin'],
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'build',
  },
});

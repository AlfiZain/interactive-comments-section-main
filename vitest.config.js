import config from './vite.config';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [...config.plugins],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest-setup.js',
  },
});

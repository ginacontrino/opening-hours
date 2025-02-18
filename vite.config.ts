/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./config/testSetup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: [
        ...configDefaults.coverage.exclude,
        'src/mocks',
        'src/main.tsx',
        'src/api.ts',
        'src/App.tsx',
      ],
    },
  },
});

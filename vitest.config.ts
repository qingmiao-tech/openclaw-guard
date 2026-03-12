import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Keep discovery scoped to the package source tests in this repo.
    include: ['src/**/*.test.ts'],
    testTimeout: 15000,
  },
});

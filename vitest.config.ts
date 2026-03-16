import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Keep discovery scoped to the package source tests in this repo.
    include: ['src/**/*.test.ts'],
    testTimeout: 15000,
    // Windows runs of this repo have shown sporadic worker RPC timeouts at the
    // very end of long suites. A single fork keeps release verification stable.
    pool: 'forks',
    fileParallelism: false,
    maxWorkers: 1,
    minWorkers: 1,
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
});

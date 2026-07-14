import { defineConfig } from 'oxlint';

export default defineConfig({
  $schema: './node_modules/oxlint/configuration_schema.json',
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'vitest', 'import', 'node', 'promise'],
  categories: {
    correctness: 'error',
    perf: 'error',
    restriction: 'error',
    style: 'error',
    suspicious: 'error',
  },
  rules: {},
  overrides: [],
  env: {
    builtin: true,
  },
  options: {
    typeAware: true,
    typeCheck: true,
  },
});

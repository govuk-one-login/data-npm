import { defineConfig } from "oxlint";

export default defineConfig({
  $schema: "./node_modules/oxlint/configuration_schema.json",
  categories: {
    correctness: "error",
    perf: "error",
    restriction: "error",
    style: "error",
    suspicious: "error",
  },
  env: {
    builtin: true,
  },
  options: {
    typeAware: true,
    typeCheck: true,
  },
  overrides: [
    {
      files: ["**/*.test.ts"],
      rules: {
        "eslint/no-empty-function": "off",
        "eslint/no-magic-numbers": "off",
        "vitest/no-hooks": "off",
        "vitest/no-importing-vitest-globals": "off",
        "vitest/prefer-describe-function-title": "off",
        "vitest/prefer-expect-assertions": "off",
        "vitest/prefer-lowercase-title": "off",
        "vitest/require-test-timeout": "off",
      },
    },
  ],
  plugins: ["eslint", "typescript", "unicorn", "oxc", "vitest", "import", "node", "promise"],
  rules: {
    "eslint/init-declarations": "off",
    "eslint/no-magic-numbers": "off",
    "eslint/no-undefined": "off",
    "eslint/sort-imports": "off",
    "eslint/sort-keys": "off",
    "import/group-exports": "off",
    "import/no-default-export": "off",
    "import/no-named-export": "off",
    "import/prefer-default-export": "off",
    "oxc/no-rest-spread-properties": "off",
  },
});

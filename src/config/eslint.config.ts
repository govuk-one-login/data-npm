// @ts-check

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
export const config = defineConfig([
  { ignores: ["dist", "coverage"] },
  {
    files: ["**/*.{js,ts}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
    ],
  },
]);

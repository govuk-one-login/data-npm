// @ts-check

// IMPORTANT: Because this is importing from our own project, we are not using the exported names
// instead we are simply importing the config directly
// not ideal, but prettier had issues with folder imports
import { config as eslintConfig } from "./src/config/eslint.config.ts";

export default eslintConfig;

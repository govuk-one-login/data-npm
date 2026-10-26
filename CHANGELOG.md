# @govuk-one-login/data-npm

## 0.0.22

### Patch Changes

- updated dependabot config to ignore typescript 7 until we have a workaround

## 0.0.21

### Patch Changes

- - Bump actions/setup-node from 7.0.0 to 7.1.0
  - Bump the prod-deps group across 1 directory with 8 updates
  - Bump the dev-deps group across 1 directory with 6 updates

## 0.0.20

### Patch Changes

- bump launch-editor from 2.14.1 to 2.14.2

## 0.0.19

### Patch Changes

- bump source-map-js from 1.2.1 to 1.2.2

## 0.0.18

### Patch Changes

- bump shell-quote from 1.10.0 to 1.12.0

## 0.0.17

### Patch Changes

- Promoted some of our dev dependencies now that we are sharing config for these tools

## 0.0.16

### Patch Changes

- Include tsconfig.json as a file for this package

## 0.0.15

### Patch Changes

- Added our standard tooling configuration (eslint, prettier and tsconfig) to the list of exports

## 0.0.14

### Patch Changes

- Updated vscode settings to prefer eslint/prettier

## 0.0.13

### Patch Changes

- Migrated to eslint and prettier

## 0.0.12

### Patch Changes

- Bump the dev-deps group across 1 directory with 6 updates

  | Package                                                                                            | From       | To         |
  | -------------------------------------------------------------------------------------------------- | ---------- | ---------- |
  | [@changesets/cli](https://github.com/changesets/changesets/tree/HEAD/packages/cli)                 | `3.0.1`    | `3.0.2`    |
  | [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/aws-lambda) | `8.10.162` | `8.10.163` |
  | [@vitest/coverage-v8](https://github.com/vitest-dev/vitest/tree/HEAD/packages/coverage-v8)         | `4.1.11`   | `5.0.0`    |
  | [oxfmt](https://github.com/oxc-project/oxc/tree/HEAD/npm/oxfmt)                                    | `0.64.0`   | `0.67.0`   |
  | [oxlint](https://github.com/oxc-project/oxc/tree/HEAD/npm/oxlint)                                  | `1.79.0`   | `1.82.0`   |
  | [vitest](https://github.com/vitest-dev/vitest/tree/HEAD/packages/vitest)                           | `4.1.11`   | `5.0.0`    |

## 0.0.11

### Patch Changes

- bumped the prod-deps group across 1 directory with 3 updates

  - Updated @aws-lambda-powertools/logger from 2.34.0 to 2.35.0
  - Updated @aws-lambda-powertools/metrics from 2.34.0 to 2.35.0
  - Updated @aws-lambda-powertools/tracer from 2.34.0 to 2.35.0

## 0.0.10

### Patch Changes

- bumped the dev-deps group across 1 directory with 5 updates

  - Updated @tsconfig/node24 from 24.0.4 to 24.0.5
  - Updated @vitest/coverage-v8 from 4.1.10 to 4.1.11
  - Updated oxfmt from 0.61.0 to 0.64.0
  - Updated oxlint from 1.76.0 to 1.79.0
  - Updated vitest from 4.1.10 to 4.1.11

## 0.0.9

### Patch Changes

- - Add MIT license
  - Bump @changesets/cli from v2 to v3

## 0.0.8

### Patch Changes

- further tweaking to release process
- add function for exponential backoff retry

## 0.0.7

### Patch Changes

- fix lint/format/secret scan npm scripts and husky hooks to align with automated tooling standards

## 0.0.6

### Patch Changes

- migrating formatter from prettier to oxfmt

## 0.0.5

### Patch Changes

- Upgrade tooling: Node 24, TypeScript 7, Oxlint, Husky, lint-staged

## 0.0.4

### Patch Changes

- Added "declaration": true to tsconfig.json so .d.ts files are emitted on build

## 0.0.3

### Patch Changes

- correct build output path and ESM import extensions

## 0.0.2

### Patch Changes

- adding tracer functionality from fraud-npm to data-npm
- fix TypeScript errors in test mocks

## 0.0.1

### Patch Changes

- initial publish of the package, containing a logger that makes use of AWS Powertools

# @govuk-one-login/data-npm

## 0.1.0

### Minor Changes

- Add utility functions: env, json, jws, object, string, time, dynamo, kms, secrets, sqs, and cloudwatch helpers

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

# data-npm

![node](https://img.shields.io/badge/node-20.x-339933?logo=nodedotjs)

Reusable NPM packages for the GOV.UK One Login data pod, published to GitHub Packages under `@govuk-one-login`.

## Packages

- [data-logging](data-logging/README.md) — Standardised logger for data pod Lambda functions

## Development

```bash
cd data-logging
npm ci
npm test
```

## Publishing

Bump the version in the package's `package.json`, merge to `main`, then go to **Actions → Publish → Run workflow**, select the package and branch.

See each package's README for details.


# @govuk-one-login/data-logging

Standardised logger for GOV.UK One Login data pod Lambda functions, built on [AWS Lambda Powertools](https://docs.powertools.aws.dev/lambda/typescript/).

## Install

```bash
npm install @govuk-one-login/data-logging
```

Requires an `.npmrc` pointing to GitHub Packages:

```
@govuk-one-login:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

## Usage

```typescript
import { DataLogger, LogEvents } from '@govuk-one-login/data-logging';

const logger = new DataLogger('my-service', 'my-namespace');

// In your Lambda handler:
logger.initialise(context);
logger.infoWithMetrics('Started', LogEvents.StartedProcessing);
```

### Extending with service-specific log events

```typescript
import { DataLogger } from '@govuk-one-login/data-logging';

enum MyLogEvents {
  SomethingHappened = 'Something Happened',
}

const logger = new DataLogger<MyLogEvents>('my-service');
logger.infoWithMetrics('msg', MyLogEvents.SomethingHappened);
```

## Generic log events

| Event | Value |
|---|---|
| `LogEvents.StartedProcessing` | `'Started Processing'` |
| `LogEvents.SuccessfullyProcessed` | `'Successfully Processed'` |
| `LogEvents.ErrorProcessing` | `'Error Processing'` |
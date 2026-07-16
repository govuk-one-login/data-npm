# @govuk-one-login/data-npm

![node](https://img.shields.io/badge/node-20.x-339933?logo=nodedotjs)

Standardised logger for GOV.UK One Login data pod Lambda functions, built on [AWS Lambda Powertools](https://docs.powertools.aws.dev/lambda/typescript/) and published to GitHub Packages.

## Install

```bash
npm install @govuk-one-login/data-npm
```

Requires an `.npmrc` pointing to GitHub Packages:

```
@govuk-one-login:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

## Usage

```typescript
import { DataLogger, LogEvents } from "@govuk-one-login/data-npm";

const logger = new DataLogger("my-service", "my-namespace");

// In your Lambda handler:
logger.initialise(context);
logger.infoWithMetrics("Started", LogEvents.StartedProcessing);
```

### Extending with service-specific log events

```typescript
import { DataLogger } from "@govuk-one-login/data-npm";

enum MyLogEvents {
  SomethingHappened = "Something Happened",
}

const logger = new DataLogger<MyLogEvents>("my-service");
logger.infoWithMetrics("msg", MyLogEvents.SomethingHappened);
```

## Generic log events

| Event                             | Value                      |
| --------------------------------- | -------------------------- |
| `LogEvents.StartedProcessing`     | `'Started Processing'`     |
| `LogEvents.SuccessfullyProcessed` | `'Successfully Processed'` |
| `LogEvents.ErrorProcessing`       | `'Error Processing'`       |

## Development

```bash
npm install
npm run build
npm test
```

### Code formatting

```bash
npm run format
```

## Publishing

This package uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

### 1. Make your changes and create a changeset

After making your code changes, create a changeset to describe what changed:

```bash
npx changeset
```

Follow the prompts to select the bump type (patch/minor/major) and describe the changes.

### 2. Version the package

Run the version command to bump `package.json` and update `CHANGELOG.md`:

```bash
npx changeset version
```

Then commit everything:

```bash
git add .
git commit -m "your change description"
git push
```

### 3. Open a pull request

Open a PR against `main` as normal and get it reviewed and merged.

### 4. What happens on merge to main

Once your PR is merged to `main`, the package is automatically published to GitHub Packages.

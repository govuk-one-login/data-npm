# @govuk-one-login/data-npm

- [@govuk-one-login/data-npm](#govuk-one-logindata-npm)
  - [Install](#install)
  - [Usage](#usage)
    - [Extending with service-specific log events](#extending-with-service-specific-log-events)
  - [Generic log events](#generic-log-events)
  - [Utilities](#utilities)
  - [Development](#development)
    - [Code formatting](#code-formatting)
  - [Publishing](#publishing)
    - [1. Create a changeset](#1-create-a-changeset)
      - [Single change](#single-change)
      - [Multiple changes in one release](#multiple-changes-in-one-release)
      - [Changing the version type](#changing-the-version-type)
    - [2. Version the package](#2-version-the-package)
    - [3. Commit and open a pull request](#3-commit-and-open-a-pull-request)
    - [4. What happens on merge to main](#4-what-happens-on-merge-to-main)
  - [Dependabot PRs](#dependabot-prs)

![node](https://img.shields.io/badge/node-24.x-339933?logo=nodedotjs)

Standardised logger and utility functions for GOV.UK One Login data pod Lambda functions, built on [AWS Lambda Powertools](https://docs.powertools.aws.dev/lambda/typescript/) and published to npm.

## Install

```bash
npm install @govuk-one-login/data-npm
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

## Utilities

| Export                                                                                      | Description                                                                              |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `getEnv(name)`                                                                              | Returns an environment variable value, throwing if it is not set                         |
| `tryParseJSON(jsonString)`                                                                  | Parses a JSON string, returning `{}` on failure                                          |
| `tryParseJSONOrUndefined(jsonString)`                                                       | Parses a JSON string, returning `undefined` on failure                                   |
| `decodeSET(set)`                                                                            | Decodes a compact JWS token into its parsed header, payload, and raw signature           |
| `getJWSParts(set)`                                                                          | Splits a compact JWS token into its raw header, payload, and signature parts             |
| `flattenObject(obj)`                                                                        | Recursively flattens a nested object into dot-notation keys                              |
| `groupBy(array, predicate)`                                                                 | Groups an array of items by a key derived from each item                                 |
| `renameObjectKey(obj, oldKeyPath, newKey)`                                                  | Renames a key in an object, supporting nested keys via a key path array                  |
| `removeQueryParamsFromUrl(url)`                                                             | Removes query parameters from a URL, returning just the origin and pathname              |
| `toBase64Url(data)`                                                                         | Encodes a string or object to a base64url string                                         |
| `nowEpochSeconds()`                                                                         | Returns the current timestamp as Unix epoch seconds                                      |
| `pause(ms)`                                                                                 | Returns a promise that resolves after the given number of milliseconds                   |
| `calculateBackoff(options)`                                                                 | Calculates an exponential backoff delay with optional jitter                             |
| `getItem(client, tableName, key)`                                                           | Gets a single item from a DynamoDB table by key                                          |
| `putItem(client, tableName, data)`                                                          | Puts an item into a DynamoDB table                                                       |
| `updateItem(client, params)`                                                                | Updates an existing item in a DynamoDB table                                             |
| `queryGSI(client, tableName, indexName, keyConditionExpression, expressionAttributeValues)` | Queries a DynamoDB Global Secondary Index                                                |
| `batchGetItems(client, tableName, keys)`                                                    | Batch gets multiple items from a DynamoDB table                                          |
| `signData(client, payload, keyArn)`                                                         | Signs a payload using a KMS key, returning the signature                                 |
| `retrieveSecret(client, secretId)`                                                          | Retrieves a secret string from Secrets Manager                                           |
| `retrieveSecretAsJSON(client, secretId)`                                                    | Retrieves and parses a JSON secret from Secrets Manager                                  |
| `describeSecret(client, secretId)`                                                          | Returns the metadata for a secret in Secrets Manager                                     |
| `sendMessage(client, queueUrl, messageBody)`                                                | Sends a message to an SQS queue                                                          |
| `sendBatchMessage(client, queueUrl, messages)`                                              | Sends a batch of messages to an SQS queue                                                |
| `getQueueUrlFromArn(arn)`                                                                   | Converts an SQS ARN to a queue URL                                                       |
| `filterLogs(client, logGroupName, filters, startTime?, maxRetries?)`                        | Filters CloudWatch log events matching all given strings, with exponential backoff retry |

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

This package uses [Changesets](https://github.com/changesets/changesets) for version management and publishing. Publishing, git tags, and GitHub Releases are automated by the release workflow on merge to `main`.

### 1. Create a changeset

After making your code changes, create a changeset to describe what changed:

```bash
npx changeset
```

Follow the prompts to select the bump type (`patch`, `minor`, or `major`) — this controls the version number. Then write a description — this becomes the changelog entry.

Alternatively, create the changeset file manually at `.changeset/<any-name>.md`:

#### Single change

```md
---
"@govuk-one-login/data-npm": minor
---

Add support for custom metric dimensions
```

#### Multiple changes in one release

If you're making multiple changes that should ship under the same version number, list them in a single changeset. Run `npx changeset` once, or create the file manually:

```md
---
"@govuk-one-login/data-npm": patch
---

- Automate release workflow with Changesets GitHub Action
- Align .npmrc auth token with setup-node
- Remove redundant registry-url from CI workflow
```

The frontmatter controls the version bump (`patch`, `minor`, or `major`). The body controls the changelog entry.

#### Changing the version type

If you need to change the bump type after creating the changeset, edit the frontmatter in the `.changeset/*.md` file before running `changeset version`.

### 2. Version the package

Run the version command to consume the changeset, bump `package.json`, and update `CHANGELOG.md`:

```bash
npx changeset version
```

### 3. Commit and open a pull request

Commit your code changes together with the version bump and changelog update.

```bash
git add .
git commit -m "feat: add custom metric dimensions"
git push
```

### 4. What happens on merge to main

Once your PR is merged to `main`, the release workflow automatically:

1. Publishes the package to npm
2. Creates a git tag (`v0.0.8`, etc.)
3. Creates a GitHub Release

If the version is already published (e.g. a non-release PR), the workflow skips gracefully.

## Dependabot PRs

A CI workflow enforces that Dependabot PRs include a version bump before they can be merged. If the `package.json` version has not changed compared to `main`, the `bump-version` check will fail with instructions.

To fix a failing Dependabot PR, check out the branch locally and create a changeset as defined above. This ensures every dependency update flows through the standard Changesets process and triggers a release on merge.

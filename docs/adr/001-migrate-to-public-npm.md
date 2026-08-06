# ADR 001: Migrate package publishing from GitHub Packages to public npm

- **Ticket:** SET-1722

## Context

`@govuk-one-login/data-npm` was published to GitHub Packages (`npm.pkg.github.com`). Consumers of the package had to configure an `.npmrc` with a GitHub token scoped to `@govuk-one-login` before they could install it. This created onboarding friction.

The goal is to publish to the public npm registry (`registry.npmjs.org`) so that `npm install @govuk-one-login/data-npm` works with no additional configuration.

## Decision

Migrate to the public npm registry in two phases, following the [GDS Way publishing-packages standard](https://gds-way.digital.cabinet-office.gov.uk/standards/publishing-packages.html).

### Phase 1 — Classic token (bootstrap)

Use a classic npm publish token stored as `NPM_TOKEN` in GitHub Actions secrets for the initial publish. This is required because OIDC trusted publishing can only be configured on a package that already exists on the registry.

`id-token: write` permission is added at this phase, it is required for npm provenance generation and must be present from the first publish.

### Phase 2 — OIDC trusted publishing (target state)

Once the package exists on npm, switch to OIDC. GitHub Actions generates a short-lived token per run; npm trusts it directly via a configured trusted publisher relationship. No long-lived secret is stored anywhere.

This requires:

- Going to npm webpage for the package and configuring a Trusted Publisher, pointing to this repo and workflow file
- Adding `--provenance` to the publish command
- Deleting the `NPM_TOKEN` secret

Note: `id-token: write` is already present in the workflow from Phase 1 (required for provenance generation).

This is the permanent authentication approach and aligns with how other `govuk-one-login` packages are published (e.g. `govuk-one-login-frontend`).

### npm org access

The package is published under the `@govuk-one-login` npm org. To be added as a collaborator, contact Adam Higginson or Nick Heal. Share your npm profile username when requesting access.

## Consequences

- Consumers can install the package with no `.npmrc` or token configuration
- Phase 1 introduces a long-lived `NPM_TOKEN` secret — this is a temporary measure and must be removed once Phase 2 OIDC is configured
- Phase 2 eliminates all long-lived secrets from the publish workflow, satisfying the GDS Way requirement for short-lived, least-privileged tokens

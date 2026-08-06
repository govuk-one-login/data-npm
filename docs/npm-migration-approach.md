# Migrating `@govuk-one-login/data-npm` to public npm

## Goal

Publish the package to the public npm registry (`registry.npmjs.org`) so consumers can install it with no `.npmrc` or GitHub token setup required.

## One-time setup (human steps)

1. Create an npm account at npmjs.com
2. Request to be added to the `@govuk-one-login` org on npm
3. Generate a **classic npm token** (npmjs.com → Access Tokens → Generate New Token → Classic → Publish)
4. Add the token as a secret named `NPM_TOKEN` in the GitHub repo (Settings → Secrets and variables → Actions)

## Code changes

Three files updated, all pointing away from GitHub Packages to `registry.npmjs.org`:

| File                             | Change                                                                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `package.json`                   | Removed `@govuk-one-login:registry` from `publishConfig`, registry set to `https://registry.npmjs.org`                                                      |
| `.npmrc`                         | Removed GitHub Packages scope and token lines, only `engine-strict=true` remains                                                                            |
| `.github/workflows/publish.yaml` | Added `registry-url: https://registry.npmjs.org` to `setup-node`, replaced `GITHUB_TOKEN` with `NPM_TOKEN`, swapped `packages: write` for `id-token: write` |
| `README.md`                      | Removed `.npmrc` requirement from install instructions                                                                                                      |

## Authentication approach

### Phase 1 — Classic token (now)

The workflow authenticates using a classic npm publish token stored as `NPM_TOKEN` in GitHub secrets. Required for the first publish because the package doesn't exist on npm yet and OIDC trust can only be configured on an existing package.

### Phase 2 — OIDC (follow-up hardening)

Once the package exists on npm, switch to OIDC (OpenID Connect). GitHub Actions generates a short-lived token per run, npm trusts it directly — no long-lived secret stored anywhere.

This involves:

- Configuring a trusted publisher on the npm package (`npm access grant`)
- Adding `--provenance` to the publish command
- Removing the `NPM_TOKEN` secret

## Questions for lead dev

- Confirm who manages the `@govuk-one-login` npm org and can add members
- Confirm classic token approach is acceptable for Phase 1
- Agree on timeline/owner for Phase 2 OIDC switch
- Any preference on token type (automation token vs classic publish token)?

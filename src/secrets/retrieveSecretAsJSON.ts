import { GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import type { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { tryParseJSONOrUndefined } from "../json/tryParseJSON.js";

/**
 * Retrieves and parses a JSON secret from Secrets Manager.
 *
 * @param client - The Secrets Manager client.
 * @param secretId - The name or ARN of the secret.
 * @returns The parsed secret value, or undefined if parsing fails.
 */
export async function retrieveSecretAsJSON<T>(
  client: SecretsManagerClient,
  secretId: string,
): Promise<T | undefined> {
  const res = await client.send(new GetSecretValueCommand({ SecretId: secretId }));
  return tryParseJSONOrUndefined(res.SecretString ?? "") as T | undefined;
}

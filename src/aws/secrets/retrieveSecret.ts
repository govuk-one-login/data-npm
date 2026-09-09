import { GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import type { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

/**
 * Retrieves a secret string from Secrets Manager.
 *
 * @param client - The Secrets Manager client.
 * @param secretId - The name or ARN of the secret.
 * @returns The secret string value, or an empty string if not set.
 */
export async function retrieveSecret(
  client: SecretsManagerClient,
  secretId: string,
): Promise<string> {
  const res = await client.send(new GetSecretValueCommand({ SecretId: secretId }));
  return res.SecretString ?? "";
}

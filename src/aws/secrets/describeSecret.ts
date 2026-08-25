import { DescribeSecretCommand } from "@aws-sdk/client-secrets-manager";
import type {
  SecretsManagerClient,
  DescribeSecretCommandOutput,
} from "@aws-sdk/client-secrets-manager";

/**
 * Returns the metadata for a secret in Secrets Manager.
 *
 * @param client - The Secrets Manager client.
 * @param secretId - The name or ARN of the secret.
 * @returns The describe secret command output containing secret metadata.
 */
export async function describeSecret(
  client: SecretsManagerClient,
  secretId: string,
): Promise<DescribeSecretCommandOutput> {
  return await client.send(new DescribeSecretCommand({ SecretId: secretId }));
}

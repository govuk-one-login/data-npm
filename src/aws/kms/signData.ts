import { SignCommand, SigningAlgorithmSpec, MessageType } from "@aws-sdk/client-kms";
import type { KMSClient } from "@aws-sdk/client-kms";

/**
 * Signs a payload using a KMS key.
 *
 * @param client - The KMS client.
 * @param payload - The raw data to sign.
 * @param keyArn - The ARN of the KMS key to use for signing.
 * @returns The signature as a Uint8Array.
 * @throws {Error} If KMS returns no signature.
 */
export async function signData(
  client: KMSClient,
  payload: Buffer,
  keyArn: string,
): Promise<Uint8Array> {
  const result = await client.send(
    new SignCommand({
      KeyId: keyArn,
      Message: payload,
      MessageType: MessageType.RAW,
      SigningAlgorithm: SigningAlgorithmSpec.RSASSA_PKCS1_V1_5_SHA_256,
    }),
  );
  if (!result.Signature) {
    throw new Error("KMS signing returned no signature");
  }
  return result.Signature;
}

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  SignCommand,
  KMSInvalidStateException,
  SigningAlgorithmSpec,
  MessageType,
} from "@aws-sdk/client-kms";
import type { SignCommandOutput, KMSClient } from "@aws-sdk/client-kms";
import { signData } from "./signData";

const mockSend = vi.fn<(command: SignCommand) => Promise<SignCommandOutput>>();
const mockClient = { send: mockSend } as unknown as KMSClient;

const keyArn = "arn:aws:kms:eu-west-2:123:key/abc";
const payload = Buffer.from("payload");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("signData", () => {
  it("returns the signature from KMS", async () => {
    const mockSignature = new Uint8Array([1, 2, 3]);
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      KeyId: keyArn,
      Signature: mockSignature,
      SigningAlgorithm: SigningAlgorithmSpec.RSASSA_PKCS1_V1_5_SHA_256,
    });

    const result = await signData(mockClient, payload, keyArn);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(SignCommand);
    expect(command.input).toEqual({
      KeyId: keyArn,
      Message: payload,
      MessageType: MessageType.RAW,
      SigningAlgorithm: SigningAlgorithmSpec.RSASSA_PKCS1_V1_5_SHA_256,
    });
    expect(result).toBe(mockSignature);
  });

  it("throws when KMS returns no signature", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      Signature: undefined,
    });

    await expect(signData(mockClient, payload, keyArn)).rejects.toThrow(
      "KMS signing returned no signature",
    );
    expect(mockSend).toHaveBeenCalledOnce();
  });

  it("propagates errors from the client", async () => {
    mockSend.mockRejectedValueOnce(
      new KMSInvalidStateException({
        message: "The key state is not valid for this operation",
        $metadata: { httpStatusCode: 400 },
      }),
    );

    await expect(signData(mockClient, payload, keyArn)).rejects.toThrow(KMSInvalidStateException);
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetSecretValueCommand, ResourceNotFoundException } from "@aws-sdk/client-secrets-manager";
import type {
  SecretsManagerClient,
  GetSecretValueCommandOutput,
} from "@aws-sdk/client-secrets-manager";
import { retrieveSecretAsJSON } from "./retrieveSecretAsJSON";

const mockSend = vi.fn<(command: GetSecretValueCommand) => Promise<GetSecretValueCommandOutput>>();
const mockClient = { send: mockSend } as unknown as SecretsManagerClient;

const secretId = "my-secret-id";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("retrieveSecretAsJSON", () => {
  it("returns the parsed JSON secret", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      SecretString: JSON.stringify({ key: "value" }),
    });

    const result = await retrieveSecretAsJSON(mockClient, secretId);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(GetSecretValueCommand);
    expect(command.input).toEqual({ SecretId: secretId });
    expect(result).toEqual({ key: "value" });
  });

  it("returns undefined when the secret string is not valid JSON", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      SecretString: "not-json",
    });

    const result = await retrieveSecretAsJSON(mockClient, secretId);

    expect(result).toBeUndefined();
  });

  it("returns undefined when SecretString is undefined", async () => {
    mockSend.mockResolvedValueOnce({ $metadata: { httpStatusCode: 200 } });

    const result = await retrieveSecretAsJSON(mockClient, secretId);

    expect(result).toBeUndefined();
  });

  it("propagates errors from the client", async () => {
    mockSend.mockRejectedValueOnce(
      new ResourceNotFoundException({
        message: "Secrets Manager can't find the specified secret",
        $metadata: { httpStatusCode: 400 },
      }),
    );

    await expect(retrieveSecretAsJSON(mockClient, secretId)).rejects.toThrow(
      ResourceNotFoundException,
    );
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

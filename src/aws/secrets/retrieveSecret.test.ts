import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetSecretValueCommand, ResourceNotFoundException } from "@aws-sdk/client-secrets-manager";
import type {
  SecretsManagerClient,
  GetSecretValueCommandOutput,
} from "@aws-sdk/client-secrets-manager";
import { retrieveSecret } from "./retrieveSecret";

const mockSend = vi.fn<(command: GetSecretValueCommand) => Promise<GetSecretValueCommandOutput>>();
const mockClient = { send: mockSend } as unknown as SecretsManagerClient;

const secretId = "my-secret-id";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("retrieveSecret", () => {
  it("returns the secret string", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      SecretString: "my-secret",
    });

    const result = await retrieveSecret(mockClient, secretId);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(GetSecretValueCommand);
    expect(command.input).toEqual({ SecretId: secretId });
    expect(result).toBe("my-secret");
  });

  it("returns an empty string when SecretString is undefined", async () => {
    mockSend.mockResolvedValueOnce({ $metadata: { httpStatusCode: 200 } });

    const result = await retrieveSecret(mockClient, secretId);

    expect(result).toBe("");
  });

  it("propagates errors from the client", async () => {
    mockSend.mockRejectedValueOnce(
      new ResourceNotFoundException({
        message: "Secrets Manager can't find the specified secret",
        $metadata: { httpStatusCode: 400 },
      }),
    );

    await expect(retrieveSecret(mockClient, secretId)).rejects.toThrow(ResourceNotFoundException);
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

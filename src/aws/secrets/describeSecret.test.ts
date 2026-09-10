import { describe, it, expect, vi, beforeEach } from "vitest";
import { DescribeSecretCommand, ResourceNotFoundException } from "@aws-sdk/client-secrets-manager";
import type {
  SecretsManagerClient,
  DescribeSecretCommandOutput,
} from "@aws-sdk/client-secrets-manager";
import { describeSecret } from "./describeSecret";

const mockSend = vi.fn<(command: DescribeSecretCommand) => Promise<DescribeSecretCommandOutput>>();
const mockClient = { send: mockSend } as unknown as SecretsManagerClient;

const secretId = "my-secret-id";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("describeSecret", () => {
  it("returns the secret description", async () => {
    const mockResponse = {
      $metadata: { httpStatusCode: 200 },
      Name: secretId,
      ARN: "arn:aws:secretsmanager:eu-west-2:123:secret:my-secret-id",
    };
    mockSend.mockResolvedValueOnce(mockResponse);

    const result = await describeSecret(mockClient, secretId);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(DescribeSecretCommand);
    expect(command.input).toEqual({ SecretId: secretId });
    expect(result).toEqual(mockResponse);
  });

  it("propagates errors from the client", async () => {
    mockSend.mockRejectedValueOnce(
      new ResourceNotFoundException({
        message: "Secrets Manager can't find the specified secret",
        $metadata: { httpStatusCode: 400 },
      }),
    );

    await expect(describeSecret(mockClient, secretId)).rejects.toThrow(ResourceNotFoundException);
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

import { describe, it, expect, vi } from "vitest";
import { retrieveSecret } from "./retrieveSecret";
import { retrieveSecretAsJSON } from "./retrieveSecretAsJSON";
import { describeSecret } from "./describeSecret";
import { GetSecretValueCommand, DescribeSecretCommand } from "@aws-sdk/client-secrets-manager";

const mockSend = vi.fn<() => unknown>();
const mockClient = { send: mockSend } as any;

describe("retrieveSecret", () => {
  it("returns the secret string", async () => {
    mockSend.mockResolvedValueOnce({ SecretString: "my-secret" });
    const result = await retrieveSecret(mockClient, "my-secret-id");
    expect(result).toBe("my-secret");
    expect(mockSend).toHaveBeenCalledWith(expect.any(GetSecretValueCommand));
  });

  it("returns an empty string when SecretString is undefined", async () => {
    mockSend.mockResolvedValueOnce({});
    const result = await retrieveSecret(mockClient, "my-secret-id");
    expect(result).toBe("");
  });
});

describe("retrieveSecretAsJSON", () => {
  it("returns the parsed JSON secret", async () => {
    mockSend.mockResolvedValueOnce({ SecretString: JSON.stringify({ key: "value" }) });
    const result = await retrieveSecretAsJSON(mockClient, "my-secret-id");
    expect(result).toEqual({ key: "value" });
  });

  it("returns undefined when the secret string is not valid JSON", async () => {
    mockSend.mockResolvedValueOnce({ SecretString: "not-json" });
    const result = await retrieveSecretAsJSON(mockClient, "my-secret-id");
    expect(result).toBeUndefined();
  });
});

describe("describeSecret", () => {
  it("returns the secret description", async () => {
    const mockResponse = {
      Name: "my-secret-id",
      ARN: "arn:aws:secretsmanager:eu-west-2:123:secret:my-secret-id",
    };
    mockSend.mockResolvedValueOnce(mockResponse);
    const result = await describeSecret(mockClient, "my-secret-id");
    expect(result).toEqual(mockResponse);
    expect(mockSend).toHaveBeenCalledWith(expect.any(DescribeSecretCommand));
  });
});

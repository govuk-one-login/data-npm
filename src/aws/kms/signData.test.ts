import { describe, it, expect, vi } from "vitest";
import { signData } from "./signData";
import { SignCommand } from "@aws-sdk/client-kms";

const mockSend = vi.fn<() => unknown>();
const mockClient = { send: mockSend } as any;

describe("signData", () => {
  it("returns the signature from KMS", async () => {
    const mockSignature = new Uint8Array([1, 2, 3]);
    mockSend.mockResolvedValueOnce({ Signature: mockSignature });
    const result = await signData(
      mockClient,
      Buffer.from("payload"),
      "arn:aws:kms:eu-west-2:123:key/abc",
    );
    expect(result).toBe(mockSignature);
    expect(mockSend).toHaveBeenCalledWith(expect.any(SignCommand));
  });

  it("throws when KMS returns no signature", async () => {
    mockSend.mockResolvedValueOnce({ Signature: undefined });
    await expect(
      signData(mockClient, Buffer.from("payload"), "arn:aws:kms:eu-west-2:123:key/abc"),
    ).rejects.toThrow("KMS signing returned no signature");
  });
});

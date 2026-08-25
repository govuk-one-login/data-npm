import { describe, it, expect, vi } from "vitest";
import { sendMessage } from "./sendMessage";
import { SendMessageCommand } from "@aws-sdk/client-sqs";

const mockSend = vi.fn<() => unknown>();
const mockClient = { send: mockSend } as any;

describe("sendMessage", () => {
  it("returns the message ID on success", async () => {
    mockSend.mockResolvedValueOnce({ MessageId: "abc-123" });
    const result = await sendMessage(
      mockClient,
      "https://sqs.eu-west-2.amazonaws.com/123/my-queue",
      { foo: "bar" },
    );
    expect(result).toBe("abc-123");
    expect(mockSend).toHaveBeenCalledWith(expect.any(SendMessageCommand));
  });

  it("returns undefined when no MessageId in response", async () => {
    mockSend.mockResolvedValueOnce({});
    const result = await sendMessage(
      mockClient,
      "https://sqs.eu-west-2.amazonaws.com/123/my-queue",
      {},
    );
    expect(result).toBeUndefined();
  });
});

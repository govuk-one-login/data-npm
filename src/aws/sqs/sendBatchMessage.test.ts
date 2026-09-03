import { describe, it, expect, vi } from "vitest";
import { sendBatchMessage } from "./sendBatchMessage";
import { SendMessageBatchCommand } from "@aws-sdk/client-sqs";

const mockSend = vi.fn<() => unknown>();
const mockClient = { send: mockSend } as any;

describe("sendBatchMessage", () => {
  it("sends a batch of messages and returns the output", async () => {
    const mockOutput = { Successful: [{ Id: "1", MessageId: "msg-1" }], Failed: [] };
    mockSend.mockResolvedValueOnce(mockOutput);
    const result = await sendBatchMessage(
      mockClient,
      "https://sqs.eu-west-2.amazonaws.com/123/my-queue",
      [{ id: "1", body: JSON.stringify({ foo: "bar" }) }],
    );
    expect(result).toEqual(mockOutput);
    expect(mockSend).toHaveBeenCalledWith(expect.any(SendMessageBatchCommand));
  });
});

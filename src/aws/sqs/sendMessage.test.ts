import { describe, it, expect, vi, beforeEach } from "vitest";
import { SendMessageCommand, ResourceNotFoundException } from "@aws-sdk/client-sqs";
import type { SQSClient, SendMessageCommandOutput } from "@aws-sdk/client-sqs";
import { sendMessage } from "./sendMessage";

const mockSend = vi.fn<(command: SendMessageCommand) => Promise<SendMessageCommandOutput>>();
const mockClient = { send: mockSend } as unknown as SQSClient;

const queueUrl = "https://sqs.eu-west-2.amazonaws.com/123/my-queue";
const messageBody = JSON.stringify({ foo: "bar" });

beforeEach(() => {
  vi.clearAllMocks();
});

describe("sendMessage", () => {
  it("returns the message ID on success", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      MessageId: "abc-123",
    });

    const result = await sendMessage(mockClient, queueUrl, messageBody);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(SendMessageCommand);
    expect(command.input).toEqual({
      QueueUrl: queueUrl,
      MessageBody: messageBody,
    });
    expect(result).toBe("abc-123");
  });

  it("returns undefined when no MessageId in response", async () => {
    mockSend.mockResolvedValueOnce({ $metadata: { httpStatusCode: 200 } });

    const result = await sendMessage(mockClient, queueUrl, messageBody);

    expect(result).toBeUndefined();
  });

  it("propagates errors from the client", async () => {
    mockSend.mockRejectedValueOnce(
      new ResourceNotFoundException({
        message: "The specified queue does not exist",
        $metadata: { httpStatusCode: 400 },
      }),
    );

    await expect(sendMessage(mockClient, queueUrl, messageBody)).rejects.toThrow(
      ResourceNotFoundException,
    );
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

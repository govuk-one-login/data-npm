import { describe, it, expect, vi, beforeEach } from "vitest";
import { SendMessageBatchCommand, ResourceNotFoundException } from "@aws-sdk/client-sqs";
import type { SQSClient, SendMessageBatchCommandOutput } from "@aws-sdk/client-sqs";
import { sendBatchMessage } from "./sendBatchMessage";

const mockSend =
  vi.fn<(command: SendMessageBatchCommand) => Promise<SendMessageBatchCommandOutput>>();
const mockClient = { send: mockSend } as unknown as SQSClient;

const queueUrl = "https://sqs.eu-west-2.amazonaws.com/123/my-queue";
const messages = [
  { id: "1", body: JSON.stringify({ foo: "bar" }) },
  { id: "2", body: JSON.stringify({ baz: "qux" }) },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("sendBatchMessage", () => {
  it("maps messages to entries and returns the output", async () => {
    const mockOutput = {
      $metadata: { httpStatusCode: 200 },
      Successful: [
        { Id: "1", MessageId: "msg-1", MD5OfMessageBody: "x" },
        { Id: "2", MessageId: "msg-2", MD5OfMessageBody: "y" },
      ],
      Failed: [],
    };
    mockSend.mockResolvedValueOnce(mockOutput);

    const result = await sendBatchMessage(mockClient, queueUrl, messages);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(SendMessageBatchCommand);
    expect(command.input).toEqual({
      QueueUrl: queueUrl,
      Entries: [
        { Id: "1", MessageBody: messages[0].body },
        { Id: "2", MessageBody: messages[1].body },
      ],
    });
    expect(result).toEqual(mockOutput);
  });

  it("propagates errors from the client", async () => {
    mockSend.mockRejectedValueOnce(
      new ResourceNotFoundException({
        message: "The specified queue does not exist",
        $metadata: { httpStatusCode: 400 },
      }),
    );

    await expect(sendBatchMessage(mockClient, queueUrl, messages)).rejects.toThrow(
      ResourceNotFoundException,
    );
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

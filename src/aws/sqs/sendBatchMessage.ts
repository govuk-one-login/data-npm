import { SendMessageBatchCommand } from "@aws-sdk/client-sqs";
import type { SQSClient, SendMessageBatchCommandOutput } from "@aws-sdk/client-sqs";

export interface BatchMessage {
  id: string;
  body: string;
}

/**
 * Sends a batch of messages to an SQS queue.
 *
 * @param client - The SQS client.
 * @param queueUrl - The URL of the target queue.
 * @param messages - The messages to send, each with an id and body string.
 * @returns The batch send command output.
 */
export async function sendBatchMessage(
  client: SQSClient,
  queueUrl: string,
  messages: BatchMessage[],
): Promise<SendMessageBatchCommandOutput> {
  return await client.send(
    new SendMessageBatchCommand({
      QueueUrl: queueUrl,
      Entries: messages.map((m) => ({ Id: m.id, MessageBody: m.body })),
    }),
  );
}

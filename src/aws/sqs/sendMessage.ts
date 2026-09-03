import { SendMessageCommand } from "@aws-sdk/client-sqs";
import type { SQSClient } from "@aws-sdk/client-sqs";

/**
 * Sends a message to an SQS queue.
 *
 * @param client - The SQS client.
 * @param queueUrl - The URL of the target queue.
 * @param messageBody - The message body string.
 * @returns The message ID assigned by SQS, or undefined.
 */
export async function sendMessage(
  client: SQSClient,
  queueUrl: string,
  messageBody: string,
): Promise<string | undefined> {
  const result = await client.send(
    new SendMessageCommand({ QueueUrl: queueUrl, MessageBody: messageBody }),
  );
  return result.MessageId;
}

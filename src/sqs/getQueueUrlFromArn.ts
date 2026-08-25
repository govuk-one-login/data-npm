/**
 * Converts an SQS queue ARN to its HTTPS queue URL.
 *
 * @param arn - The SQS queue ARN (e.g. `arn:aws:sqs:eu-west-2:123456789012:my-queue`).
 * @returns The HTTPS queue URL.
 *
 * @example
 * getQueueUrlFromArn('arn:aws:sqs:eu-west-2:123456789012:my-queue')
 * // 'https://sqs.eu-west-2.amazonaws.com/123456789012/my-queue'
 */
export function getQueueUrlFromArn(arn: string): string {
  const [, , , region, accountId, queueName] = arn.split(":");
  return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
}

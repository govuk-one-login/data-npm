import { parse, validate } from "@aws-sdk/util-arn-parser";

/**
 * Converts an SQS queue ARN to its HTTPS queue URL.
 *
 * @param arn - The SQS queue ARN (e.g. `arn:aws:sqs:eu-west-2:123456789012:my-queue`).
 * @returns The HTTPS queue URL.
 * @throws {Error} If the ARN is not a well-formed SQS queue ARN.
 *
 * @example
 * getQueueUrlFromArn('arn:aws:sqs:eu-west-2:123456789012:my-queue')
 * // 'https://sqs.eu-west-2.amazonaws.com/123456789012/my-queue'
 */
export function getQueueUrlFromArn(arn: string): string {
  if (!validate(arn)) {
    throw new Error(`Invalid SQS queue ARN: ${arn}`);
  }

  const { service, region, accountId, resource } = parse(arn);

  if (service !== "sqs" || region === "" || accountId === "" || resource === "") {
    throw new Error(`Invalid SQS queue ARN: ${arn}`);
  }

  return `https://sqs.${region}.amazonaws.com/${accountId}/${resource}`;
}

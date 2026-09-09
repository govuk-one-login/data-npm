import { describe, it, expect } from "vitest";
import { getQueueUrlFromArn } from "./getQueueUrlFromArn";

describe("getQueueUrlFromArn", () => {
  it("converts an SQS ARN to a queue URL", () => {
    expect(getQueueUrlFromArn("arn:aws:sqs:eu-west-2:123456789012:my-queue")).toBe(
      "https://sqs.eu-west-2.amazonaws.com/123456789012/my-queue",
    );
  });

  it("uses the region and account id from the ARN", () => {
    expect(getQueueUrlFromArn("arn:aws:sqs:us-east-1:999999999999:other-queue")).toBe(
      "https://sqs.us-east-1.amazonaws.com/999999999999/other-queue",
    );
  });

  it("handles a FIFO queue name", () => {
    expect(getQueueUrlFromArn("arn:aws:sqs:eu-west-2:123456789012:my-queue.fifo")).toBe(
      "https://sqs.eu-west-2.amazonaws.com/123456789012/my-queue.fifo",
    );
  });

  it.each([
    ["a non-ARN string", "not-an-arn"],
    ["an empty string", ""],
    ["a missing queue name", "arn:aws:sqs:eu-west-2:123456789012"],
    ["a non-SQS service", "arn:aws:s3:::my-bucket"],
    ["an empty region", "arn:aws:sqs::123456789012:my-queue"],
    ["an empty account id", "arn:aws:sqs:eu-west-2::my-queue"],
  ])("throws for a malformed ARN (%s)", (_description, arn) => {
    expect(() => getQueueUrlFromArn(arn)).toThrow("Invalid SQS queue ARN");
  });
});

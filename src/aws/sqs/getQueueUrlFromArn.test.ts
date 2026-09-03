import { describe, it, expect } from "vitest";
import { getQueueUrlFromArn } from "./getQueueUrlFromArn";

describe("getQueueUrlFromArn", () => {
  it("converts an SQS ARN to a queue URL", () => {
    expect(getQueueUrlFromArn("arn:aws:sqs:eu-west-2:123456789012:my-queue")).toBe(
      "https://sqs.eu-west-2.amazonaws.com/123456789012/my-queue",
    );
  });
});

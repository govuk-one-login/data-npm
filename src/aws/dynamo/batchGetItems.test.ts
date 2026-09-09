import { describe, it, expect, vi, beforeEach } from "vitest";
import { BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import type { BatchGetCommandOutput, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { batchGetItems } from "./batchGetItems";
import { ProvisionedThroughputExceededException } from "@aws-sdk/client-dynamodb";

const mockSend = vi.fn<(command: BatchGetCommand) => Promise<BatchGetCommandOutput>>();
const mockClient = { send: mockSend } as unknown as DynamoDBDocumentClient;

const tableName = "my-table";
const keys = [{ id: "1" }, { id: "2" }];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("batchGetItems", () => {
  it("returns items from the batch get response", async () => {
    const items = [
      { id: "1", name: "one" },
      { id: "2", name: "two" },
    ];
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      Responses: { [tableName]: items },
    });

    const result = await batchGetItems(mockClient, tableName, keys);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(BatchGetCommand);
    expect(command.input).toEqual({
      RequestItems: { [tableName]: { Keys: keys } },
    });
    expect(result).toEqual(items);
  });

  it("returns an empty array when no items match the keys", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      Responses: { [tableName]: [] },
    });

    const result = await batchGetItems(mockClient, tableName, keys);

    expect(mockSend).toHaveBeenCalledOnce();
    expect(result).toEqual([]);
  });

  it("returns an empty array when Responses is undefined", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      Responses: undefined,
    });

    const result = await batchGetItems(mockClient, tableName, keys);

    expect(mockSend).toHaveBeenCalledOnce();
    expect(result).toEqual([]);
  });

  it("propagates errors from the client", async () => {
    mockSend.mockRejectedValueOnce(
      new ProvisionedThroughputExceededException({
        message: "The level of configured provisioned throughput was exceeded",
        $metadata: { httpStatusCode: 400 },
      }),
    );

    await expect(batchGetItems(mockClient, tableName, keys)).rejects.toThrow(
      ProvisionedThroughputExceededException,
    );
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

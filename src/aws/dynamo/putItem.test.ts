import { describe, it, expect, vi, beforeEach } from "vitest";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { PutCommandOutput, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { putItem } from "./putItem";
import { ProvisionedThroughputExceededException } from "@aws-sdk/client-dynamodb";

const mockSend = vi.fn<(command: PutCommand) => Promise<PutCommandOutput>>();
const mockClient = { send: mockSend } as unknown as DynamoDBDocumentClient;

const tableName = "my-table";
const item = { id: "123", name: "test" };

beforeEach(() => {
  vi.clearAllMocks();
});

describe("putItem", () => {
  it("sends a PutCommand with the correct parameters", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
    });

    await putItem(mockClient, tableName, item);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(PutCommand);
    expect(command.input).toEqual({
      TableName: tableName,
      Item: item,
    });
  });

  it("propagates errors from the client", async () => {
    mockSend.mockRejectedValueOnce(
      new ProvisionedThroughputExceededException({
        message: "The level of configured provisioned throughput was exceeded",
        $metadata: { httpStatusCode: 400 },
      }),
    );

    await expect(putItem(mockClient, tableName, item)).rejects.toThrow(
      ProvisionedThroughputExceededException,
    );
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import type { UpdateCommandOutput, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { updateItem } from "./updateItem";
import { ProvisionedThroughputExceededException } from "@aws-sdk/client-dynamodb";

const mockSend = vi.fn<(command: UpdateCommand) => Promise<UpdateCommandOutput>>();
const mockClient = { send: mockSend } as unknown as DynamoDBDocumentClient;

const params = {
  tableName: "my-table",
  key: { id: "123" },
  updateExpression: "SET #n = :n",
  expressionAttributeNames: { "#n": "name" },
  expressionAttributeValues: { ":n": "updated" },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("updateItem", () => {
  it("sends an UpdateCommand with the correct parameters", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
    });

    await updateItem(mockClient, params);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(UpdateCommand);
    expect(command.input).toEqual({
      TableName: params.tableName,
      Key: params.key,
      UpdateExpression: params.updateExpression,
      ExpressionAttributeNames: params.expressionAttributeNames,
      ExpressionAttributeValues: params.expressionAttributeValues,
    });
  });

  it("propagates errors from the client", async () => {
    mockSend.mockRejectedValueOnce(
      new ProvisionedThroughputExceededException({
        message: "The level of configured provisioned throughput was exceeded",
        $metadata: { httpStatusCode: 400 },
      }),
    );

    await expect(updateItem(mockClient, params)).rejects.toThrow(
      ProvisionedThroughputExceededException,
    );
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

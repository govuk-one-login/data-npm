import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import type { QueryCommandOutput, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { queryGSI } from "./queryGSI";

const mockSend = vi.fn<(command: QueryCommand) => Promise<QueryCommandOutput>>();
const mockClient = { send: mockSend } as unknown as DynamoDBDocumentClient;

const tableName = "my-table";
const indexName = "my-index";
const keyConditionExpression = "id = :id";
const expressionAttributeValues = { ":id": "1" };

beforeEach(() => {
  vi.clearAllMocks();
});

describe("queryGSI", () => {
  it("returns items from the GSI query", async () => {
    const items = [{ id: "1" }, { id: "2" }];
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      Items: items,
    });

    const result = await queryGSI(
      mockClient,
      tableName,
      indexName,
      keyConditionExpression,
      expressionAttributeValues,
    );

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(QueryCommand);
    expect(command.input).toEqual({
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    expect(result).toEqual(items);
  });

  it("returns an empty array when no items found", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      Items: undefined,
    });

    const result = await queryGSI(
      mockClient,
      tableName,
      indexName,
      keyConditionExpression,
      expressionAttributeValues,
    );

    expect(result).toEqual([]);
  });
});

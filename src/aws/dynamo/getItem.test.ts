import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import type { GetCommandOutput, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getItem } from "./getItem";

const mockSend = vi.fn<(command: GetCommand) => Promise<GetCommandOutput>>();
const mockClient = { send: mockSend } as unknown as DynamoDBDocumentClient;

const tableName = "my-table";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getItem", () => {
  it("returns the item when found", async () => {
    const key = { id: "123" };
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      Item: { id: "123", name: "test" },
    });

    const result = await getItem(mockClient, tableName, key);

    expect(mockSend).toHaveBeenCalledOnce();
    const command = mockSend.mock.calls[0][0];
    expect(command).toBeInstanceOf(GetCommand);
    expect(command.input).toEqual({
      TableName: tableName,
      Key: key,
    });
    expect(result).toEqual({ id: "123", name: "test" });
  });

  it("returns undefined when item is not found", async () => {
    mockSend.mockResolvedValueOnce({
      $metadata: { httpStatusCode: 200 },
      Item: undefined,
    });

    const result = await getItem(mockClient, tableName, { id: "missing" });

    expect(result).toBeUndefined();
  });
});

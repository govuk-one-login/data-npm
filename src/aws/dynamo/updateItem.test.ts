import { describe, it, expect, vi } from "vitest";
import { updateItem } from "./updateItem";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const mockSend = vi.fn<() => unknown>();
const mockClient = { send: mockSend } as any;

describe("updateItem", () => {
  it("sends an UpdateCommand with the correct parameters", async () => {
    mockSend.mockResolvedValueOnce({});
    await updateItem(mockClient, {
      tableName: "my-table",
      key: { id: "123" },
      updateExpression: "SET #n = :n",
      expressionAttributeNames: { "#n": "name" },
      expressionAttributeValues: { ":n": "updated" },
    });
    expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateCommand));
  });
});

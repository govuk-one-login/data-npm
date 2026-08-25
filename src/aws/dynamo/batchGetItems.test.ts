import { describe, it, expect, vi } from "vitest";
import { batchGetItems } from "./batchGetItems";
import { BatchGetCommand } from "@aws-sdk/lib-dynamodb";

const mockSend = vi.fn<() => unknown>();
const mockClient = { send: mockSend } as any;

describe("batchGetItems", () => {
  it("returns items from the batch get response", async () => {
    mockSend.mockResolvedValueOnce({ Responses: { "my-table": [{ id: "1" }, { id: "2" }] } });
    const result = await batchGetItems(mockClient, "my-table", [{ id: "1" }, { id: "2" }]);
    expect(result).toEqual([{ id: "1" }, { id: "2" }]);
    expect(mockSend).toHaveBeenCalledWith(expect.any(BatchGetCommand));
  });

  it("returns an empty array when no items found", async () => {
    mockSend.mockResolvedValueOnce({ Responses: undefined });
    const result = await batchGetItems(mockClient, "my-table", [{ id: "x" }]);
    expect(result).toEqual([]);
  });
});

import { describe, it, expect, vi } from "vitest";
import { queryGSI } from "./queryGSI";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const mockSend = vi.fn<() => unknown>();
const mockClient = { send: mockSend } as any;

describe("queryGSI", () => {
  it("returns items from the GSI query", async () => {
    mockSend.mockResolvedValueOnce({ Items: [{ id: "1" }, { id: "2" }] });
    const result = await queryGSI(mockClient, "my-table", "my-index", "id = :id", { ":id": "1" });
    expect(result).toEqual([{ id: "1" }, { id: "2" }]);
    expect(mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));
  });

  it("returns an empty array when no items found", async () => {
    mockSend.mockResolvedValueOnce({ Items: undefined });
    const result = await queryGSI(mockClient, "my-table", "my-index", "id = :id", { ":id": "x" });
    expect(result).toEqual([]);
  });
});

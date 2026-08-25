import { describe, it, expect, vi } from "vitest";
import { getItem } from "./getItem";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const mockSend = vi.fn<() => unknown>();
const mockClient = { send: mockSend } as any;

describe("getItem", () => {
  it("returns the item when found", async () => {
    mockSend.mockResolvedValueOnce({ Item: { id: "123", name: "test" } });
    const result = await getItem(mockClient, "my-table", { id: "123" });
    expect(result).toEqual({ id: "123", name: "test" });
    expect(mockSend).toHaveBeenCalledWith(expect.any(GetCommand));
  });

  it("returns undefined when item is not found", async () => {
    mockSend.mockResolvedValueOnce({ Item: undefined });
    const result = await getItem(mockClient, "my-table", { id: "missing" });
    expect(result).toBeUndefined();
  });
});

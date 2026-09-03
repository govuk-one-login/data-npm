import { describe, it, expect, vi } from "vitest";
import { putItem } from "./putItem";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const mockSend = vi.fn<() => unknown>();
const mockClient = { send: mockSend } as any;

describe("putItem", () => {
  it("sends a PutCommand with the correct parameters", async () => {
    mockSend.mockResolvedValueOnce({});
    await putItem(mockClient, "my-table", { id: "123", name: "test" });
    expect(mockSend).toHaveBeenCalledWith(expect.any(PutCommand));
  });
});

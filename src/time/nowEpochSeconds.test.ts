import { describe, it, expect, vi, afterEach } from "vitest";
import { nowEpochSeconds } from "./nowEpochSeconds";

describe("nowEpochSeconds", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the current time as epoch seconds", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000_000_000_000);
    expect(nowEpochSeconds()).toBe(1_000_000_000);
  });
});

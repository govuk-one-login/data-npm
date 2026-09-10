import { describe, it, expect, vi, afterEach } from "vitest";
import { nowEpochSeconds, nowEpochMilliseconds } from "./epoch";

describe("nowEpochSeconds", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the current time as epoch seconds", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000_000_000_000);
    expect(nowEpochSeconds()).toBe(1_000_000_000);
  });
});

describe("nowEpochMilliseconds", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the current time as epoch milliseconds", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000_000_000_000);
    expect(nowEpochMilliseconds()).toBe(1_000_000_000_000);
  });
});

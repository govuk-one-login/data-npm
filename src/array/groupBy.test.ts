import { describe, it, expect } from "vitest";
import { groupBy } from "./groupBy";

describe("groupBy", () => {
  it("groups items by the predicate key", () => {
    const input = [
      { type: "a", val: 1 },
      { type: "b", val: 2 },
      { type: "a", val: 3 },
    ];
    expect(groupBy(input, (item) => item.type)).toEqual({
      a: [
        { type: "a", val: 1 },
        { type: "a", val: 3 },
      ],
      b: [{ type: "b", val: 2 }],
    });
  });

  it("returns an empty object for an empty array", () => {
    expect(groupBy([], (item: string) => item)).toEqual({});
  });
});

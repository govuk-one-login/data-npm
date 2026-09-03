import { describe, it, expect } from "vitest";
import { flattenObject } from "./flattenObject";

describe("flattenObject", () => {
  it("flattens a nested object into dot-notation keys", () => {
    expect(flattenObject({ cat: { dog: "123" } })).toEqual({ "cat.dog": "123" });
  });

  it("handles deeply nested objects", () => {
    expect(flattenObject({ a: { b: { c: "value" } } })).toEqual({ "a.b.c": "value" });
  });

  it("leaves flat objects unchanged", () => {
    expect(flattenObject({ a: "1", b: "2" })).toEqual({ a: "1", b: "2" });
  });

  it("preserves array values without flattening them", () => {
    expect(flattenObject({ a: [1, 2, 3] })).toEqual({ a: [1, 2, 3] });
  });

  it("handles null values", () => {
    expect(flattenObject({ a: null })).toEqual({ a: null });
  });
});

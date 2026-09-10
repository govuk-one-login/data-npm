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

  it("explodes array values using index notation", () => {
    expect(flattenObject({ cat: ["dog", 123] })).toEqual({ "cat[0]": "dog", "cat[1]": 123 });
  });

  it("explodes arrays nested within objects", () => {
    expect(flattenObject({ a: { b: [1, 2] } })).toEqual({ "a.b[0]": 1, "a.b[1]": 2 });
  });

  it("explodes objects nested within arrays", () => {
    expect(flattenObject({ a: [{ b: 1 }, { c: 2 }] })).toEqual({ "a[0].b": 1, "a[1].c": 2 });
  });

  it("preserves an empty object as a leaf value", () => {
    expect(flattenObject({ a: {} })).toEqual({ a: {} });
  });

  it("preserves a nested empty object without dropping the key", () => {
    expect(flattenObject({ a: { b: {} }, c: 1 })).toEqual({ "a.b": {}, c: 1 });
  });

  it("preserves an empty array as a leaf value", () => {
    expect(flattenObject({ a: [] })).toEqual({ a: [] });
  });

  it("handles null values", () => {
    expect(flattenObject({ a: null })).toEqual({ a: null });
  });
});

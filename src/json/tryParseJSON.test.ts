import { describe, it, expect } from "vitest";
import { tryParseJSON, tryParseJSONOrUndefined } from "./tryParseJSON";

describe("tryParseJSON", () => {
  it("returns parsed object for valid JSON", () => {
    expect(tryParseJSON('{"key":"value"}')).toEqual({ key: "value" });
  });

  it("returns parsed array for valid JSON array", () => {
    expect(tryParseJSON("[1,2,3]")).toEqual([1, 2, 3]);
  });

  it("returns parsed primitive for valid JSON primitive", () => {
    expect(tryParseJSON("123")).toBe(123);
  });

  it("returns null for the JSON literal null", () => {
    expect(tryParseJSON("null")).toBeNull();
  });

  it("returns empty object for invalid JSON", () => {
    expect(tryParseJSON("not-json")).toEqual({});
  });

  it("returns empty object for an empty string", () => {
    expect(tryParseJSON("")).toEqual({});
  });
});

describe("tryParseJSONOrUndefined", () => {
  it("returns parsed object for valid JSON", () => {
    expect(tryParseJSONOrUndefined('{"key":"value"}')).toEqual({ key: "value" });
  });

  it("returns parsed array for valid JSON array", () => {
    expect(tryParseJSONOrUndefined("[1,2,3]")).toEqual([1, 2, 3]);
  });

  it("returns parsed primitive for valid JSON primitive", () => {
    expect(tryParseJSONOrUndefined("123")).toBe(123);
  });

  it("returns null for the JSON literal null", () => {
    expect(tryParseJSONOrUndefined("null")).toBeNull();
  });

  it("returns undefined for invalid JSON", () => {
    expect(tryParseJSONOrUndefined("not-json")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(tryParseJSONOrUndefined("")).toBeUndefined();
  });
});

import { describe, it, expect } from "vitest";
import { tryParseJSON, tryParseJSONOrUndefined } from "./tryParseJSON";

describe("tryParseJSON", () => {
  it("returns parsed object for valid JSON", () => {
    expect(tryParseJSON('{"key":"value"}')).toEqual({ key: "value" });
  });

  it("returns empty object for invalid JSON", () => {
    expect(tryParseJSON("not-json")).toEqual({});
  });
});

describe("tryParseJSONOrUndefined", () => {
  it("returns parsed object for valid JSON", () => {
    expect(tryParseJSONOrUndefined('{"key":"value"}')).toEqual({ key: "value" });
  });

  it("returns undefined for invalid JSON", () => {
    expect(tryParseJSONOrUndefined("not-json")).toBeUndefined();
  });
});

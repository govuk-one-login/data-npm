import { describe, it, expect } from "vitest";
import { removeQueryParamsFromUrl } from "./removeQueryParamsFromUrl";

describe("removeQueryParamsFromUrl", () => {
  it("removes query parameters from a URL", () => {
    expect(removeQueryParamsFromUrl("https://example.com/path?foo=bar")).toBe(
      "https://example.com/path",
    );
  });

  it("returns the URL unchanged when there are no query parameters", () => {
    expect(removeQueryParamsFromUrl("https://example.com/path")).toBe("https://example.com/path");
  });

  it("removes multiple query parameters", () => {
    expect(removeQueryParamsFromUrl("https://example.com/path?foo=bar&baz=qux")).toBe(
      "https://example.com/path",
    );
  });
});

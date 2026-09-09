import { describe, it, expect } from "vitest";
import { removeQueryParamsAndHashFromUrl } from "./removeQueryParamsAndHashFromUrl";

describe("removeQueryParamsAndHashFromUrl", () => {
  it("removes query parameters from a URL", () => {
    expect(removeQueryParamsAndHashFromUrl("https://example.com/path?foo=bar")).toBe(
      "https://example.com/path",
    );
  });

  it("removes multiple query parameters", () => {
    expect(removeQueryParamsAndHashFromUrl("https://example.com/path?foo=bar&baz=qux")).toBe(
      "https://example.com/path",
    );
  });

  it("removes a hash fragment", () => {
    expect(removeQueryParamsAndHashFromUrl("https://example.com/path#section")).toBe(
      "https://example.com/path",
    );
  });

  it("removes both query parameters and a hash fragment", () => {
    expect(removeQueryParamsAndHashFromUrl("https://example.com/path?foo=bar#section")).toBe(
      "https://example.com/path",
    );
  });

  it("returns the URL unchanged when there are no query parameters or hash", () => {
    expect(removeQueryParamsAndHashFromUrl("https://example.com/path")).toBe(
      "https://example.com/path",
    );
  });

  it("preserves a trailing slash in the pathname", () => {
    expect(removeQueryParamsAndHashFromUrl("https://example.com/a/b/?x=1")).toBe(
      "https://example.com/a/b/",
    );
  });

  it("preserves a non-default port", () => {
    expect(removeQueryParamsAndHashFromUrl("https://example.com:8443/path?x=1")).toBe(
      "https://example.com:8443/path",
    );
  });

  it("discards userinfo credentials", () => {
    expect(removeQueryParamsAndHashFromUrl("https://user:pass@example.com/path")).toBe(
      "https://example.com/path",
    );
  });

  it("throws for a string that is not a valid URL", () => {
    expect(() => removeQueryParamsAndHashFromUrl("not-a-url")).toThrow(TypeError);
  });
});

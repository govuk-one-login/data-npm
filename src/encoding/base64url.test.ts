import { describe, it, expect } from "vitest";
import {
  stringToBase64Url,
  objectToBase64Url,
  fromBase64Url,
  fromBase64UrlToObject,
} from "./base64url";

describe("stringToBase64Url", () => {
  it("encodes a string to base64url", () => {
    expect(stringToBase64Url("hello")).toBe("aGVsbG8");
  });

  it("produces url-safe output without padding", () => {
    // ">>>?" base64-encodes to "Pj4+Pw==" which contains +, / and padding
    expect(stringToBase64Url(">>>?")).toBe("Pj4-Pw");
  });
});

describe("objectToBase64Url", () => {
  it("encodes an object to base64url", () => {
    expect(objectToBase64Url({ foo: "bar" })).toBe("eyJmb28iOiJiYXIifQ");
  });
});

describe("fromBase64Url", () => {
  it("decodes a base64url string back to a plain string", () => {
    expect(fromBase64Url("aGVsbG8")).toBe("hello");
  });

  it("round-trips unicode strings", () => {
    const input = "héllo · 世界";
    expect(fromBase64Url(stringToBase64Url(input))).toBe(input);
  });
});

describe("fromBase64UrlToObject", () => {
  it("decodes a base64url string and parses it as JSON", () => {
    expect(fromBase64UrlToObject("eyJmb28iOiJiYXIifQ")).toEqual({ foo: "bar" });
  });

  it("round-trips an object", () => {
    const obj = { foo: "bar", nested: { n: 1 }, list: [1, 2, 3] };
    expect(fromBase64UrlToObject(objectToBase64Url(obj))).toEqual(obj);
  });
});

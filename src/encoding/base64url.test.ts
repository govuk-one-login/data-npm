import { describe, it, expect } from "vitest";
import {
  stringToBase64Url,
  objectToBase64Url,
  fromBase64Url,
  fromBase64UrlToObject,
} from "./base64url";

describe("stringToBase64Url", () => {
  it("encodes a string to base64url", () => {
    expect(stringToBase64Url("hello")).toBe(Buffer.from("hello").toString("base64url"));
  });
});

describe("objectToBase64Url", () => {
  it("encodes an object to base64url", () => {
    const obj = { foo: "bar" };
    expect(objectToBase64Url(obj)).toBe(Buffer.from(JSON.stringify(obj)).toString("base64url"));
  });
});

describe("fromBase64Url", () => {
  it("decodes a base64url string back to a plain string", () => {
    expect(fromBase64Url(Buffer.from("hello").toString("base64url"))).toBe("hello");
  });
});

describe("fromBase64UrlToObject", () => {
  it("decodes a base64url string and parses it as JSON", () => {
    const obj = { foo: "bar" };
    expect(fromBase64UrlToObject(Buffer.from(JSON.stringify(obj)).toString("base64url"))).toEqual(
      obj,
    );
  });
});

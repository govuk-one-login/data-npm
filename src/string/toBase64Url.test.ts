import { describe, it, expect } from "vitest";
import { toBase64Url } from "./toBase64Url";

describe("toBase64Url", () => {
  it("encodes a string to base64url", () => {
    expect(toBase64Url("hello")).toBe(Buffer.from("hello").toString("base64url"));
  });

  it("encodes an object to base64url", () => {
    const obj = { foo: "bar" };
    expect(toBase64Url(obj)).toBe(Buffer.from(JSON.stringify(obj)).toString("base64url"));
  });
});

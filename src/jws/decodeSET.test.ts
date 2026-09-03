import { describe, it, expect } from "vitest";
import { decodeSET, getJWSParts } from "./decodeSET";

const header = Buffer.from(JSON.stringify({ alg: "RS256" })).toString("base64url");
const payload = Buffer.from(JSON.stringify({ sub: "user123" })).toString("base64url");
const signature = "test-signature";
const validSET = `${header}.${payload}.${signature}`;

describe("getJWSParts", () => {
  it("splits a JWS token into header, payload, and signature", () => {
    expect(getJWSParts(validSET)).toEqual({ header, payload, signature });
  });
});

describe("decodeSET", () => {
  it("decodes a valid SET into header, payload, and signature", () => {
    expect(decodeSET(validSET)).toEqual({
      decodedHeader: { alg: "RS256" },
      decodedPayload: { sub: "user123" },
      signature,
    });
  });

  it("throws FailedToDecodeSET for an invalid token", () => {
    expect(() => decodeSET("not.valid")).toThrow("FailedToDecodeSET");
  });
});

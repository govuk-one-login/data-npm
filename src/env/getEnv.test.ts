import { describe, it, expect, afterEach } from "vitest";
import { getEnv } from "./getEnv";

describe("getEnv", () => {
  afterEach(() => {
    delete process.env["TEST_VAR"];
  });

  it("returns the value when the environment variable is set", () => {
    process.env["TEST_VAR"] = "hello";
    expect(getEnv("TEST_VAR")).toBe("hello");
  });

  it("returns an empty string when the variable is set but empty", () => {
    process.env["TEST_VAR"] = "";
    expect(getEnv("TEST_VAR")).toBe("");
  });

  it("throws when the environment variable is not set", () => {
    expect(() => getEnv("TEST_VAR")).toThrow("Missing environment variable: TEST_VAR");
  });
});

import { describe, it, expect } from "vitest";
import { renameObjectKey } from "./renameObjectKey";

describe("renameObjectKey", () => {
  it("renames a top-level key", () => {
    expect(renameObjectKey({ a: 1, b: 2 }, ["a"], "c")).toEqual({ c: 1, b: 2 });
  });

  it("renames a nested key", () => {
    expect(renameObjectKey({ a: { b: 1 } }, ["a", "b"], "c")).toEqual({ a: { c: 1 } });
  });

  it("throws when key path is empty", () => {
    expect(() => renameObjectKey({ a: 1 }, [], "b")).toThrow("Key path must not be empty.");
  });

  it("throws when key does not exist", () => {
    expect(() => renameObjectKey({ a: 1 }, ["z"], "b")).toThrow(
      'Key "z" does not exist in the object.',
    );
  });
});

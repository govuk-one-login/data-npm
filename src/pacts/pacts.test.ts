import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const PACTS_DIR = path.resolve(import.meta.dirname, "../../pacts");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const pactFileNames = readdirSync(PACTS_DIR).filter((fileName) => fileName.endsWith(".json"));

describe("published pact files", () => {
  it("includes at least one pact file", () => {
    expect(pactFileNames.length).toBeGreaterThan(0);
  });

  describe.each(pactFileNames)("%s", (fileName) => {
    const pact: unknown = JSON.parse(readFileSync(path.join(PACTS_DIR, fileName), "utf8"));

    it("names the consumer and provider, and the file is named after them", () => {
      expect(isRecord(pact)).toBe(true);
      const { consumer, provider } = pact as Record<string, unknown>;
      const consumerName = isRecord(consumer) ? consumer["name"] : undefined;
      const providerName = isRecord(provider) ? provider["name"] : undefined;

      expect(consumerName).toEqual(expect.any(String));
      expect(providerName).toEqual(expect.any(String));
      expect(fileName).toBe(`${consumerName as string}-${providerName as string}.json`);
    });

    it("declares a pact specification version", () => {
      const metadata = (pact as Record<string, unknown>)["metadata"];
      const specification = isRecord(metadata) ? metadata["pactSpecification"] : undefined;

      expect(isRecord(specification) ? specification["version"] : undefined).toEqual(
        expect.any(String),
      );
    });

    it("contains at least one message interaction", () => {
      // Pact V3 files list messages under `messages`; V4 files use `interactions`.
      const { messages, interactions } = pact as Record<string, unknown>;
      const entries = Array.isArray(messages) ? messages : interactions;

      expect(Array.isArray(entries)).toBe(true);
      expect((entries as unknown[]).length).toBeGreaterThan(0);
    });
  });
});

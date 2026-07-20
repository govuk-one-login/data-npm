import { describe, it, expect, vi, afterEach } from "vitest";
import { calculateBackoff } from "./backoff";

describe("calculateBackoff", () => {
  // Always clean up mocks after tests to prevent cross-test contamination
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("deterministic exponential calculation (jitter disabled)", () => {
    // Best Practice: Use an array of objects for `.each` so arguments are named.
    // This makes the test parameters highly readable.
    const deterministicCases = [
      // Standard default behavior (base 100, factor 2, max 10000)
      { attempt: 0, expected: 100, scenario: "first attempt (100 * 2^0)" },
      { attempt: 1, expected: 200, scenario: "second attempt (100 * 2^1)" },
      { attempt: 2, expected: 400, scenario: "third attempt (100 * 2^2)" },
      { attempt: 3, expected: 800, scenario: "fourth attempt (100 * 2^3)" },

      // Testing the maxDelay cap
      {
        attempt: 7,
        expected: 10000,
        scenario: "capped at default maxDelay (100 * 2^7 = 12800 -> 10000)",
      },

      // Custom configuration overrides
      {
        attempt: 2,
        baseDelay: 50,
        factor: 3,
        expected: 450,
        scenario: "custom base and factor (50 * 3^2)",
      },
      { attempt: 5, maxDelay: 500, expected: 500, scenario: "custom maxDelay cap is respected" },
    ];

    // Best Practice: Use test name templating ($variable) to generate dynamic test names
    it.each(deterministicCases)(
      "returns $expected ms for $scenario",
      ({ attempt, baseDelay, factor, maxDelay, expected }) => {
        const result = calculateBackoff({
          attempt,
          baseDelay,
          factor,
          maxDelay,
          jitter: false, // Explicitly disable jitter to test pure math
        });

        expect(result).toBe(expected);
      },
    );
  });

  describe("jitter calculation (jitter enabled)", () => {
    const jitterCases = [
      { randomValue: 0.0, expected: 0, boundary: "minimum bound" },
      { randomValue: 0.5, expected: 50, boundary: "exact middle" },
      { randomValue: 0.999, expected: 99, boundary: "maximum bound" },
    ];

    it.each(jitterCases)(
      "returns $expected ms when Math.random is $randomValue ($boundary)",
      ({ randomValue, expected }) => {
        // Best Practice: Mock non-deterministic globals to make tests reliable
        vi.spyOn(Math, "random").mockReturnValue(randomValue);

        const result = calculateBackoff({
          attempt: 0, // Base calculation will be 100ms
          jitter: true,
        });

        expect(result).toBe(expected);
        expect(Math.random).toHaveBeenCalledOnce();
      },
    );
  });
});

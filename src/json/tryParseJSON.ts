/**
 * Parses a JSON string, returning a fallback value on failure.
 *
 * @param jsonString - The JSON string to parse.
 * @returns The parsed value, or an empty object if parsing fails.
 */
export function tryParseJSON(jsonString: string): unknown {
  try {
    return JSON.parse(jsonString) as unknown;
  } catch {
    return {};
  }
}

/**
 * Parses a JSON string, returning undefined on failure.
 *
 * @param jsonString - The JSON string to parse.
 * @returns The parsed value, or undefined if parsing fails.
 */
export function tryParseJSONOrUndefined(jsonString: string): unknown {
  try {
    return JSON.parse(jsonString) as unknown;
  } catch {
    return undefined;
  }
}

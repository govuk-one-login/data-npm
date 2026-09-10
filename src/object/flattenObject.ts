/**
 * Recursively flattens a nested object into a single-level object with
 * dot-notation keys. Array elements are exploded using `[index]` notation.
 * Empty objects and empty arrays are preserved as leaf values, and `null`
 * is treated as a leaf value.
 *
 * @example
 * flattenObject({ cat: { dog: "123" } })  // { "cat.dog": "123" }
 * flattenObject({ cat: ["dog", 123] })     // { "cat[0]": "dog", "cat[1]": 123 }
 * flattenObject({ a: {} })                  // { "a": {} }
 *
 * @param obj - The object to flatten.
 * @returns A flattened object with dot-notation keys.
 */
export function flattenObject(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  const assign = (prefix: string, value: unknown): void => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        result[prefix] = value;
        return;
      }
      value.forEach((item, index) => assign(`${prefix}[${index}]`, item));
    } else if (typeof value === "object" && value !== null) {
      const keys = Object.keys(value);
      if (keys.length === 0) {
        result[prefix] = value;
        return;
      }
      for (const key of keys) {
        assign(`${prefix}.${key}`, (value as Record<string, unknown>)[key]);
      }
    } else {
      result[prefix] = value;
    }
  };

  for (const key of Object.keys(obj)) {
    assign(key, obj[key]);
  }

  return result;
}

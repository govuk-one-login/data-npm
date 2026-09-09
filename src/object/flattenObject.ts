/**
 * Recursively flattens a nested object into a single-level object with dot-notation keys.
 *
 * @example
 * flattenObject({ cat: { dog: '123' } }) // { 'cat.dog': '123' }
 *
 * @param obj - The object to flatten.
 * @returns A flattened object with dot-notation keys.
 */
export function flattenObject(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const nested = flattenObject(value as Record<string, unknown>);
      for (const nestedKey in nested) {
        result[`${key}.${nestedKey}`] = nested[nestedKey];
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

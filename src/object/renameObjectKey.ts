/**
 * Renames a key in an object, supporting nested keys via a key path array.
 *
 * @param obj - The object containing the key to rename.
 * @param oldKeyPath - Array of keys representing the path to the key to rename.
 * @param newKey - The new key name.
 * @returns A new object with the key renamed.
 * @throws {Error} If the key path is empty or does not exist in the object.
 *
 * @example
 * renameObjectKey({ a: { b: 1 } }, ['a', 'b'], 'c') // { a: { c: 1 } }
 */
export function renameObjectKey<T extends Record<string, unknown>>(
  obj: T,
  oldKeyPath: string[],
  newKey: string,
): Record<string, unknown> {
  if (oldKeyPath.length === 0) throw new Error("Key path must not be empty.");
  const currentKey = oldKeyPath[0] as string;
  const restPath = oldKeyPath.slice(1);
  if (!(currentKey in obj)) throw new Error(`Key "${currentKey}" does not exist in the object.`);
  if (restPath.length === 0) {
    const { [currentKey]: oldValue, ...rest } = obj;
    return { ...rest, [newKey]: oldValue };
  }
  return {
    ...obj,
    [currentKey]: renameObjectKey(obj[currentKey] as Record<string, unknown>, restPath, newKey),
  };
}

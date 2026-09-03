/**
 * Groups an array of items by a key derived from each item.
 *
 * @param array - The array to group.
 * @param predicate - A function that returns the group key for each item.
 * @returns An object mapping each key to an array of items with that key.
 */
export function groupBy<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string,
): Record<string, T[]> {
  return array.reduce(
    (acc, value, index, arr) => {
      const key = predicate(value, index, arr);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(value);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}

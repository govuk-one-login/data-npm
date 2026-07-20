/**
 * Pauses execution for a specified duration.
 *
 * @param ms - The time to wait in milliseconds.
 * @returns A promise that resolves after the specified delay.
 *
 * @example
 * ```typescript
 * await pause(1000); // wait 1 second
 * ```
 */
export async function pause(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

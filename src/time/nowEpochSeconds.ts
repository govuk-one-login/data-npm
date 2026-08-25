/**
 * Returns the current timestamp as Unix epoch seconds.
 *
 * @returns The current time as an integer number of seconds since the Unix epoch.
 *
 * @example
 * nowEpochSeconds() // e.g. 1724515200
 */
export function nowEpochSeconds(): number {
  return Math.round(Date.now() / 1000);
}

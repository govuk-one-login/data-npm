/**
 * Retrieves an environment variable by name, throwing if it is not set.
 *
 * @param name - The name of the environment variable.
 * @returns The value of the environment variable.
 * @throws {Error} If the environment variable is not set.
 */
export function getEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === null) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

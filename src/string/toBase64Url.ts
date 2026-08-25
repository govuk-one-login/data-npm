/**
 * Encodes a string or object to a base64url string.
 * Objects are JSON-serialised before encoding.
 *
 * @param data - The string or object to encode.
 * @returns The base64url-encoded string.
 *
 * @example
 * toBase64Url('hello')           // 'aGVsbG8'
 * toBase64Url({ foo: 'bar' })    // 'eyJmb28iOiJiYXIifQ'
 */
export function toBase64Url(data: object | string): string {
  const str = typeof data === "string" ? data : JSON.stringify(data);
  return Buffer.from(str).toString("base64url");
}

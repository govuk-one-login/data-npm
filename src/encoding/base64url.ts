/**
 * Encodes a string to a base64url string.
 *
 * @param data - The string to encode.
 * @returns The base64url-encoded string.
 *
 * @example
 * stringToBase64Url('hello') // 'aGVsbG8'
 */
export function stringToBase64Url(data: string): string {
  return Buffer.from(data).toString("base64url");
}

/**
 * Encodes an object to a base64url string by JSON-serialising it first.
 *
 * @param data - The object to encode.
 * @returns The base64url-encoded string.
 *
 * @example
 * objectToBase64Url({ foo: 'bar' }) // 'eyJmb28iOiJiYXIifQ'
 */
export function objectToBase64Url(data: object): string {
  return Buffer.from(JSON.stringify(data)).toString("base64url");
}

/**
 * Decodes a base64url string back to a plain string.
 *
 * @param data - The base64url-encoded string.
 * @returns The decoded string.
 *
 * @example
 * fromBase64Url('aGVsbG8') // 'hello'
 */
export function fromBase64Url(data: string): string {
  return Buffer.from(data, "base64url").toString("utf8");
}

/**
 * Decodes a base64url string and parses it as JSON.
 *
 * @param data - The base64url-encoded JSON string.
 * @returns The parsed object cast to T.
 *
 * @example
 * fromBase64UrlToObject<{ foo: string }>('eyJmb28iOiJiYXIifQ') // { foo: 'bar' }
 */
export function fromBase64UrlToObject<T>(data: string): T {
  return JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as T;
}

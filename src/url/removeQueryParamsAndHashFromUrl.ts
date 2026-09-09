/**
 * Reduces a URL to just its origin and pathname, discarding the query string,
 * hash fragment, and any userinfo (credentials). The port is preserved.
 *
 * @param url - The full URL string.
 * @returns The URL string containing only the origin and pathname.
 * @throws {TypeError} If `url` is not a valid absolute URL.
 *
 * @example
 * removeQueryParamsAndHashFromUrl('https://example.com/path?foo=bar#section')
 * // 'https://example.com/path'
 */
export function removeQueryParamsAndHashFromUrl(url: string): string {
  const urlObj = new URL(url);
  return new URL(urlObj.pathname, urlObj.origin).href;
}

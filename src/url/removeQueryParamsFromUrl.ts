/**
 * Removes query parameters from a URL, returning just the origin and pathname.
 *
 * @param url - The full URL string including query parameters.
 * @returns The URL string with query parameters removed.
 *
 * @example
 * removeQueryParamsFromUrl('https://example.com/path?foo=bar') // 'https://example.com/path'
 */
export function removeQueryParamsFromUrl(url: string): string {
  const urlObj = new URL(url);
  return new URL(urlObj.pathname, urlObj.origin).href;
}

import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

let DOMPurify: ReturnType<typeof createDOMPurify>;
/**
 * Sanitize a string to remove potentially harmful HTML content.
 * I have created this after having issues with using isomorphic-dompurify on the server side in production.
 * UPDATE: No longer needed. I am relying on client-side sanitization only.
 * @param dirty The dirty HTML string to sanitize.
 * @returns The sanitized HTML string.
 */
export function sanitize(dirty: string): string {
  if (!DOMPurify) {
    const window = new JSDOM("").window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DOMPurify = createDOMPurify(window as any);
  }
  return DOMPurify.sanitize(dirty);
}

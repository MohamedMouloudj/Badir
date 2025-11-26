"use client";
import createDOMPurify from "dompurify";

let DOMPurify: ReturnType<typeof createDOMPurify>;

export function sanitize(dirty: string): string {
  if (typeof window === "undefined") {
    // Should never happen in client components, but just in case
    return dirty;
  }

  if (!DOMPurify) {
    DOMPurify = createDOMPurify(window);
  }
  return DOMPurify.sanitize(dirty);
}

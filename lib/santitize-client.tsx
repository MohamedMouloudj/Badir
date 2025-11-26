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
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "blockquote",
      "code",
      "pre",
      "span",
      "div",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "style",
      "target",
      "rel",
    ],
  });
}

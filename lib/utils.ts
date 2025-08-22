import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mimeTypeToExtension = (mimeType: string): string => {
  if (mimeType.startsWith("image/")) {
    return `.${mimeType.replace("image/", "")} `.toUpperCase();
  } else if (mimeType.startsWith("application/")) {
    return `.${mimeType.replace("application/", "")} `.toUpperCase();
  }
  return `.${mimeType.split("/").pop()} `.toUpperCase();
};

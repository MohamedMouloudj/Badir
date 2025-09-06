import { User, UserQualification } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  getCountryCallingCode,
  getCountries,
  CountryCode,
  CountryCallingCode,
} from "libphonenumber-js";

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

export function toPlainUser(user: User, qualifications?: UserQualification) {
  const qualification = qualifications ?? {};

  return {
    ...user,
    qualifications: qualification,
    phoneCountryCode: user.phone
      ? getCountryFromCallingCode(user.phone.split(" ")[0].replace("+", ""))
      : "DZ",
    phone: user.phone ? user.phone.split(" ")[1] : "",
    latitude: user.latitude ? Number(user.latitude) : undefined,
    longitude: user.longitude ? Number(user.longitude) : undefined,
  };
}

/**
 * Get calling code from country code. (e.g: "DZ" => "213")
 */
export function getCallingCodeFromCountry(
  countryCode: CountryCode | string
): string | undefined {
  try {
    return getCountryCallingCode(countryCode as CountryCode);
  } catch {
    return undefined;
  }
}

/**
 * Get country code from calling code (e.g: "213" => "DZ").
 * Returns the first matching country code, or undefined if not found
 */
export function getCountryFromCallingCode(
  callingCode: CountryCallingCode | string
): string | undefined {
  const countries = getCountries();
  for (const country of countries) {
    if (getCountryCallingCode(country as CountryCode) === callingCode) {
      return country;
    }
  }
  return undefined;
}

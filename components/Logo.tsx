import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({ withText = true }: { withText?: boolean }) {
  if (!withText) {
    return (
      <div className="relative flex-center justify-center">
        <Image
          src="/images/logos/logo-nt.svg"
          alt="Badir logo"
          width={104}
          height={40}
          className="object-contain"
        />
        <Link href="/" className="absolute inset-0" />
      </div>
    );
  }
  return (
    <div className="relative flex-center justify-center">
      <Image
        src="/images/logos/logo.svg"
        alt="Badir logo"
        width={104}
        height={40}
        className="object-contain"
      />
      <Link href="/" className="absolute inset-0" />
    </div>
  );
}

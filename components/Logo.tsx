import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({ withText = true }: { withText?: boolean }) {
  if (!withText) {
    return (
      <div className="flex-center relative justify-center">
        <Image
          src="/images/logos/logo-nt.svg"
          alt="Badir logo"
          width={104}
          height={40}
          className="h-auto w-auto object-contain"
          priority
        />
        <Link href="/" className="absolute inset-0">
          <span className="sr-only">العودة إلى الصفحة الرئيسية</span>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex-center relative justify-center">
      <Image
        src="/images/logos/logo.svg"
        alt="Badir logo"
        width={104}
        height={40}
        className="h-auto w-auto object-contain"
        priority
      />
      <Link href="/" className="absolute inset-0">
        <span className="sr-only">العودة إلى الصفحة الرئيسية</span>
      </Link>
    </div>
  );
}

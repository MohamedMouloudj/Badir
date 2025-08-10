import Image from "next/image";
import React from "react";

type StatProps = {
  title: string;
  value: string | number;
};

export default function Stat({ title, value }: StatProps) {
  return (
    <div className="flex-center gap-2 justify-center" dir="rtl">
      <Image
        src="/images/icons/double-users.svg"
        alt="stats"
        width={80}
        height={80}
      />
      <div className="flex-center-column items-start">
        <h3 className="text-primary-sm font-bold text-neutrals-700 " dir="ltr">
          + {value}
        </h3>
        <p className="text-secondary-sm font-semibold">{title}</p>
      </div>
    </div>
  );
}

import { StatProps } from "@/types/Statics";
import Image from "next/image";
import React, { JSX } from "react";

export default function Stat({
  config,
  stat,
}: {
  config: StatProps;
  stat: Record<StatProps["key"], number>;
}) {
  return (
    <div className="flex-center gap-2 justify-center" dir="rtl">
      {config.icon}
      <div className="flex-center-column items-start">
        <h3 className="text-primary-sm font-bold text-neutrals-700 " dir="ltr">
          + {stat[config.key] ?? 0}
        </h3>
        <p className="text-secondary-sm font-semibold">{config.title}</p>
      </div>
    </div>
  );
}

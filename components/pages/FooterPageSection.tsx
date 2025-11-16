import { ReactNode } from "react";

interface PolicySectionProps {
  title: string;
  children: ReactNode;
}

export function FooterPageSection({ title, children }: PolicySectionProps) {
  return (
    <div
      className="bg-neutrals-200 border-neutrals-300 mb-4 w-full rounded-xl border-2 p-6"
      dir="rtl"
    >
      <h2 className="text-primary-500 text-secondary-sm mb-4 text-right font-bold">
        {title}
      </h2>
      <div className="text-neutrals-600 text-right">{children}</div>
    </div>
  );
}

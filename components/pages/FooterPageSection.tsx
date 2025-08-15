import { ReactNode } from "react";

interface PolicySectionProps {
  title: string;
  children: ReactNode;
}

export function FooterPageSection({ title, children }: PolicySectionProps) {
  return (
    <div
      className="w-full bg-neutrals-200 border-2 border-neutrals-300 rounded-xl p-6 mb-4"
      dir="rtl"
    >
      <h2 className="text-primary-500 font-bold text-secondary-sm mb-4 text-right">
        {title}
      </h2>
      <div className="text-right text-neutrals-600">{children}</div>
    </div>
  );
}

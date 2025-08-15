interface PolicyListItemProps {
  text: string;
}

export function FooterPageItem({ text }: PolicyListItemProps) {
  return (
    <div
      className="flex items-start justify-start gap-2 mb-2 text-right"
      dir="rtl"
    >
      <span className="text-primary-500 mt-1">•</span>
      <p className="text-neutrals-600 text-paragraph-lg">{text}</p>
    </div>
  );
}

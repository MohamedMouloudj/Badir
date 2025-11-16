import React from "react";

interface GuideItemProps {
  title: string;
  content: string;
  isBullet?: boolean;
}

export default function GuideItem({
  title,
  content,
  isBullet = false,
}: GuideItemProps) {
  if (isBullet) {
    return (
      <div className="flex items-start">
        <div className="flex flex-1">
          <span className="text-primary-500 ml-3">•</span>
          <span className="text-neutrals-700">{content}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <div className="flex-1">
        <h3 className="text-primary-500 text-secondary-sm ml-2 inline-block font-bold">
          {title}:
        </h3>{" "}
        <span className="text-neutrals-700">{content}</span>
      </div>
    </div>
  );
}

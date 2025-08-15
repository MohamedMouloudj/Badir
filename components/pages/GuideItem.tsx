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
        <div className="flex-1 flex">
          <span className="text-primary-500 ml-3">•</span>
          <span className="text-neutrals-700">{content}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <div className="flex-1">
        <h3 className="text-primary-500 font-bold text-lg inline-block ml-2">
          {title}:
        </h3>{" "}
        <span className="text-neutrals-700">{content}</span>
      </div>
    </div>
  );
}

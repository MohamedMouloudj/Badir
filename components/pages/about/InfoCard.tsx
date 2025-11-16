import { JSX } from "react";

interface InfoCardProps {
  title: string;
  description: string | JSX.Element;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}) => {
  return (
    <div
      className={`bg-neutrals-200 border-neutrals-400 relative mx-auto w-full rounded-2xl border p-6 shadow-sm backdrop-blur-sm ${className} `}
      dir="rtl"
      style={
        {
          "--badge-height": "2.5rem", // Approximate height of badge (py-2 + text + border)
        } as React.CSSProperties
      }
    >
      {/* Title Badge - positioned absolutely, centered on mobile */}
      <div
        className="absolute right-8 max-sm:right-1/2 max-sm:translate-x-1/2"
        style={{ top: "calc(-1 * var(--badge-height) / 2)" }}
      >
        <span
          className={`text-primary-sm max-sm:text-secondary-lg bg-neutrals-200 border-neutrals-400 text-primary-500 font-ibm-plex-sans-arabic block rounded-full border-2 px-6 py-2 font-bold whitespace-nowrap shadow-sm ${titleClassName} `}
        >
          {title}
        </span>
      </div>

      {/* Description - centered with dynamic padding based on badge height */}
      <div
        className="text-center"
        style={{
          paddingTop: "calc(var(--badge-height) / 2 + 1rem)",
        }}
      >
        {typeof description === "string" ? (
          <p
            className={`text-neutrals-700 text-secondary-md max-sm:text-secondary-sm font-ibm-plex-sans-arabic text-base leading-relaxed font-semibold ${descriptionClassName} `}
          >
            {description}
          </p>
        ) : (
          <div
            className={`text-neutrals-700 text-secondary-md max-sm:text-secondary-sm font-ibm-plex-sans-arabic text-right text-base leading-relaxed font-semibold md:px-8 ${descriptionClassName} `}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;

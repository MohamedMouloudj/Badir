interface InfoCardProps {
  title: string;
  description: string;
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
      className={`
      bg-neutrals-200
      backdrop-blur-sm 
      border
      border-neutrals-400
      rounded-2xl 
      shadow-sm
      p-6 
      w-full
      mx-auto
      relative
      ${className}
    `}
      dir="rtl"
      style={
        {
          "--badge-height": "2.5rem", // Approximate height of badge (py-2 + text + border)
        } as React.CSSProperties
      }
    >
      {/* Title Badge - positioned absolutely in top right */}
      <div className="absolute -top-3 right-8">
        <span
          className={`
          px-6 
          py-2 
          rounded-full 
          text-primary-sm
          font-bold
          bg-neutrals-200
          border-2
          border-neutrals-400 
          text-primary-500
          font-ibm-plex-sans-arabic
          shadow-sm
          ${titleClassName}
        `}
        >
          {title}
        </span>
      </div>

      {/* Description - centered with dynamic padding based on badge height */}
      <div
        className="text-center"
        style={{
          paddingTop: "calc(var(--badge-height) / 2 + 0.5rem)",
        }}
      >
        <p
          className={`
          text-base 
          leading-relaxed 
          text-neutrals-700
          text-secondary-md
          font-semibold
          font-ibm-plex-sans-arabic
          ${descriptionClassName}
        `}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;

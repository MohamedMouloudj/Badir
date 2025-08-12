import { partners } from "@/data/statics";
import Image from "next/image";

const PartnerMarqueeCard = ({
  partner,
  index,
}: {
  partner: (typeof partners)[number];
  index: number;
}) => {
  return (
    <div
      className="item itemRight flex-center-column items-center gap-2 h-full py-1"
      style={{ "--position": index } as React.CSSProperties}
    >
      <div className="min-w-20 min-h-20">
        <Image
          alt={partner.name}
          src={partner.imageSrc}
          className="overflow-hidden object-cover rounded-full"
          width={80}
          height={80}
        />
      </div>
      <span className="text-sm text-neutrals-100 mt-2 font-medium text-center block w-max">
        {partner.name}
      </span>
    </div>
  );
};

export default PartnerMarqueeCard;

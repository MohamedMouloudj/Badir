"use client";
import { Partner } from "@/types/Statics";
import { Building } from "lucide-react";
import Image from "next/image";

const PartnerMarquee = ({ partners }: { partners: Partner[] }) => {
  return (
    <div
      className="wrapper max-w-full flex-center bg-primary-400"
      style={{ "--number-marquee": partners.length } as React.CSSProperties}
    >
      {partners.map((partner, index) => (
        <div
          className="item itemRight flex-center-column items-center gap-2 h-full py-1"
          style={{ "--position": index } as React.CSSProperties}
          key={`marquee-card-${index}`}
        >
          <div className="min-w-20 min-h-20 bg-neutrals-100 rounded-full overflow-hidden border w-20 h-20 flex-shrink-0">
            {partner.imageSrc ? (
              <Image
                alt={partner.name}
                src={partner.imageSrc}
                className="overflow-hidden object-cover rounded-full"
                width={80}
                height={80}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building className="w-8 h-8 text-neutrals-500" />
              </div>
            )}
          </div>
          <span className="text-sm text-neutrals-100 mt-2 font-medium text-center block w-max">
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PartnerMarquee;

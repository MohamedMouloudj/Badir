import { StatProps } from "@/types/Statics";
import { Building2, Handshake } from "lucide-react";
import Image from "next/image";

const statistics: StatProps[] = [
  {
    id: 1,
    title: "منظمة",
    key: "organizations",
    icon: <Building2 className="w-18 h-18 text-primary-500" />,
  },
  {
    id: 2,
    title: "مبادرة",
    key: "initiatives",
    icon: <Handshake className="w-18 h-18 text-primary-500" />,
  },
  {
    id: 3,
    title: "متطوع نشط",
    key: "activeVolunteers",
    icon: (
      <Image
        src="/images/icons/double-users.svg"
        alt="stats"
        width={72}
        height={72}
      />
    ),
  },
];

export default statistics;

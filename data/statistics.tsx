import { StatProps } from "@/types/Statics";
import { Building2, Handshake } from "lucide-react";
import Image from "next/image";

const statistics: StatProps[] = [
  {
    id: 1,
    title: "منظمة",
    key: "organizations",
    icon: <Building2 className="text-primary-500 h-18 w-18" />,
  },
  {
    id: 2,
    title: "مبادرة",
    key: "initiatives",
    icon: <Handshake className="text-primary-500 h-18 w-18" />,
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

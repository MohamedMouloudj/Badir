import { IBM_Plex_Sans_Arabic } from "next/font/google";

const IBMPlex = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export { IBMPlex };

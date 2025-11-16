import About from "@/components/pages/about/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "عَنَّا",
  description:
    "منصّة تطوعية تهدف إلى تنظيم العمل التطوعي عبر ربط المتطوّعين بالفرص التطوعية إلكترونيًا وميدانيًا، ومدّ يد العون للمحتاجين في إطارٍ من التعاون والعطاء المنظّم.",
};

export default function page() {
  return <About />;
}

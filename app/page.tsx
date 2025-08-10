import Contact from "@/components/pages/landing/Contact";
import Hero from "@/components/pages/landing/Hero";
import LastInitiatives from "@/components/pages/landing/LastInitiatives";
import Partners from "@/components/pages/landing/Partners";
import Stats from "@/components/pages/landing/Stats";
import Testimonials from "@/components/pages/landing/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <LastInitiatives />
      <Testimonials />
      <Partners />
      <Contact />
    </>
  );
}

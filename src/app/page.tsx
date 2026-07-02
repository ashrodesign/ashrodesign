import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { VideoSection } from "@/components/sections/VideoSection";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Founder } from "@/components/sections/Founder";
import { Services } from "@/components/sections/Services";
import { Works } from "@/components/sections/Works";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <VideoSection />
        <WhyChoose />
        <Founder />
        <Services />
        <Works />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

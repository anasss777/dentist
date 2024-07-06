import Faq from "@/components/Faq";
import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import Highlights from "@/components/Home/Highlights";
import Intro from "@/components/Home/Intro";
import Services from "@/components/Home/Services";
import Testimonial from "@/components/Testimonial";
import Tips from "@/components/Tips";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      {/* <Tips /> */}
      <Highlights />
      <Testimonial />
      <Faq />
      <Contact />
    </main>
  );
}

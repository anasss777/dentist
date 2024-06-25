import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import Intro from "@/components/Home/Intro";
import Services from "@/components/Home/Services";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <Testimonial />
      <Contact />
    </main>
  );
}

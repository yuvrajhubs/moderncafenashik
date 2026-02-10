import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InfoSection from "@/components/InfoSection";
import ContactFooter from "@/components/ContactFooter";

const Index = () => (
  <main className="scroll-smooth">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <MenuSection />
    <GallerySection />
    <TestimonialsSection />
    <InfoSection />
    <ContactFooter />
  </main>
);

export default Index;

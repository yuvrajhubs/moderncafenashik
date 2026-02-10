import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import heroBg from "@/assets/hero-bg.jpg";
import aboutCafe from "@/assets/about-cafe.jpg";

const galleryImages = [
  { src: heroBg, alt: "Cafe interior with spices" },
  { src: aboutCafe, alt: "Cozy cafe ambiance" },
  { src: heroBg, alt: "Traditional decor" },
  { src: aboutCafe, alt: "Warm dining space" },
  { src: heroBg, alt: "Spice display" },
  { src: aboutCafe, alt: "Inviting atmosphere" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">Gallery</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Glimpses of <span className="text-secondary">Our Space</span>
          </h2>
        </AnimatedSection>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-5xl mx-auto">
          {galleryImages.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div
                className="mb-4 break-inside-avoid cursor-pointer group overflow-hidden rounded-lg"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 ${
                    i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                  }`}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cafe-charcoal/90 z-50 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground"
              onClick={() => setLightbox(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "./AnimatedSection";

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase.from("testimonials").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data as unknown as Testimonial[]);
    });
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-card mandala-pattern">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">Testimonials</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            What Our <span className="text-secondary">Guests Say</span>
          </h2>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < testimonials[current].rating ? "fill-accent text-accent" : "text-muted"}
                  />
                ))}
              </div>
              <p className="font-body text-lg md:text-xl text-foreground/90 italic leading-relaxed mb-6">
                "{testimonials[current].quote}"
              </p>
              <p className="font-display text-lg font-semibold text-primary">
                {testimonials[current].name}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

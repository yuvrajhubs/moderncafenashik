import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  { name: "Priya Sharma", rating: 5, quote: "The best vegetarian thali in Nashik! Every dish is bursting with flavour. The ambiance feels like home but elevated." },
  { name: "Rajesh Patil", rating: 5, quote: "Their coffee is exceptional and the desserts are to die for. Modern Cafe has become our family's weekend tradition." },
  { name: "Ananya Deshmukh", rating: 4, quote: "Loved the cozy atmosphere and the organic options. The Poha here is the best I've had. Highly recommend for brunch!" },
  { name: "Vikram Joshi", rating: 5, quote: "A hidden gem in Nashik. The patio seating is beautiful and the service is impeccable. Must try the Shrikhand!" },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

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

          {/* Nav */}
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

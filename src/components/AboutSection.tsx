import { Coffee, Cake, LeafyGreen } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import aboutImg from "@/assets/about-cafe.jpg";

const highlights = [
  { icon: Coffee, label: "Great Coffee" },
  { icon: Cake, label: "Great Dessert" },
  { icon: LeafyGreen, label: "Great Tea Selection" },
];

const atmosphereTags = ["Casual", "Cozy", "Quiet", "Trendy"];

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <AnimatedSection>
          <div className="relative">
            <img
              src={aboutImg}
              alt="Modern Cafe Nashik interior"
              className="rounded-lg shadow-xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-accent rounded-lg -z-10" />
          </div>
        </AnimatedSection>

        {/* Text */}
        <AnimatedSection delay={0.2}>
          <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">Our Story</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            A Taste of <span className="text-secondary">Tradition</span>
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Nestled in the heart of Nashik, Modern Cafe brings you an authentic regional Indian dining
            experience with a focus on fresh, vegetarian cuisine. From hearty breakfasts to soulful
            dinners, every dish is crafted with love, organic ingredients, and time-honored recipes
            passed down through generations.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-4 mb-6">
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border"
              >
                <Icon size={18} className="text-primary" />
                <span className="font-body text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Atmosphere tags */}
          <div className="flex flex-wrap gap-2">
            {atmosphereTags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary/10 text-secondary font-body text-xs px-3 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Map */}
      <AnimatedSection delay={0.3}>
        <div className="mt-16 rounded-lg overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.0214882667706!2d73.76091511039066!3d20.007612821989852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb9a03f08da5%3A0x1a6579e2db3ae6c6!2sModern%20Cafe%20Nashik!5e0!3m2!1sen!2sin!4v1771672566739!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Modern Cafe Nashik location"
          />
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default AboutSection;

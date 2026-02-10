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
    </div>
  </section>
);

export default AboutSection;

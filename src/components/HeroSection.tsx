import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () =>
<section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${heroBg})` }} />

    <div className="absolute inset-0 bg-cafe-charcoal/60" />

    {/* Decorative mandala overlay */}
    <div className="absolute inset-0 mandala-pattern opacity-30" />

    {/* Content */}
    <div className="relative z-10 text-center px-6 max-w-4xl">
      <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>

        <p className="font-body text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-4">
          Nashik's Finest Vegetarian Dining
        </p>
      </motion.div>

      <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight">THE RENAISSANCE  
OF MODERN 
CAFE NASHIK


      <span className="block text-accent">CAFE NASHIK
      </span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
    className="font-body text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">

        A casual nook with patio dining, serving regional Indian fare with a vegetarian focus
      </motion.p>

      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center">

        <a
        href="#menu"
        className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-8 py-3 rounded-md tracking-wide transition-colors">

          Explore Menu
        </a>
        <a
        href="#contact"
        className="inline-block border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-body font-semibold px-8 py-3 rounded-md tracking-wide transition-colors">

          Visit Us
        </a>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2">

      <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center pt-2">
        <div className="w-1.5 h-3 bg-accent rounded-full" />
      </div>
    </motion.div>
  </section>;


export default HeroSection;
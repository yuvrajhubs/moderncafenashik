import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ContactFooter = () => (
  <footer id="contact" className="bg-cafe-charcoal text-primary-foreground">
    <div className="container mx-auto px-6 py-20">
      <div className="grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <AnimatedSection>
          <h3 className="font-display text-3xl font-bold mb-4">
            MODERN<span className="text-accent"> CAFE</span>
          </h3>
          <p className="font-body text-primary-foreground/70 text-sm leading-relaxed mb-6">
            Nashik's beloved vegetarian dining destination. Regional Indian fare crafted with love,
            organic ingredients, and a passion for tradition.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* Contact Info */}
        <AnimatedSection delay={0.1}>
          <h4 className="font-display text-lg font-semibold mb-4">Get in Touch</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-accent mt-0.5" />
              <p className="font-body text-sm text-primary-foreground/70">
                Modern Cafe, College Road,<br />Nashik, Maharashtra 422005
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-accent" />
              <a href="tel:+912532345678" className="font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                +91 253 234 5678
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-accent" />
              <a href="mailto:hello@moderncafe.in" className="font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                hello@moderncafe.in
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Map placeholder */}
        <AnimatedSection delay={0.2}>
          <h4 className="font-display text-lg font-semibold mb-4">Find Us</h4>
          <div className="bg-primary-foreground/10 rounded-lg aspect-[4/3] flex items-center justify-center border border-primary-foreground/10">
            <div className="text-center">
              <MapPin size={32} className="text-accent mx-auto mb-2" />
              <p className="font-body text-sm text-primary-foreground/50">Map location</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-primary-foreground/10 py-6">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-primary-foreground/40">
          © 2026 Modern Cafe Nashik. All rights reserved.
        </p>
        <p className="font-body text-xs text-primary-foreground/40">
          Crafted with ❤️ in Nashik
        </p>
      </div>
    </div>
  </footer>
);

export default ContactFooter;

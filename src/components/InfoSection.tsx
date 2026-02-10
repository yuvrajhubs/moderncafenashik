import {
  UtensilsCrossed, Truck, Store, TreePalm, HandHelping,
  Accessibility, Car, CreditCard, Smartphone, Clock,
  Users, Baby, GraduationCap, Globe,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  { icon: TreePalm, label: "Outdoor Seating" },
  { icon: UtensilsCrossed, label: "Dine-in" },
  { icon: Store, label: "Takeaway" },
  { icon: Truck, label: "Delivery" },
  { icon: HandHelping, label: "No-contact Delivery" },
];

const accessibility = [
  "Wheelchair-accessible entrance",
  "Wheelchair-accessible seating",
  "Wheelchair-accessible toilet",
  "Wheelchair-accessible car park",
];

const crowds = [
  { icon: Users, label: "Family Friendly" },
  { icon: Users, label: "Groups" },
  { icon: Globe, label: "Tourists" },
  { icon: GraduationCap, label: "University Students" },
  { icon: Baby, label: "Good for Kids" },
];

const payments = [
  { icon: CreditCard, label: "Credit/Debit Cards" },
  { icon: Smartphone, label: "Google Pay & NFC" },
];

const hours = [
  { day: "Monday – Friday", time: "8:00 AM – 10:00 PM" },
  { day: "Saturday – Sunday", time: "7:00 AM – 11:00 PM" },
];

const InfoSection = () => (
  <section id="info" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-6">
      <AnimatedSection className="text-center mb-14">
        <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">Info & Services</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
          Everything You <span className="text-secondary">Need to Know</span>
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Services */}
        <AnimatedSection>
          <div className="bg-card rounded-lg p-6 border border-border h-full">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">Service Options</h3>
            <div className="space-y-3">
              {services.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={18} className="text-primary" />
                  <span className="font-body text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Accessibility */}
        <AnimatedSection delay={0.1}>
          <div className="bg-card rounded-lg p-6 border border-border h-full">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Accessibility size={20} className="text-primary" /> Accessibility
            </h3>
            <ul className="space-y-2">
              {accessibility.map((item) => (
                <li key={item} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* Crowd */}
        <AnimatedSection delay={0.2}>
          <div className="bg-card rounded-lg p-6 border border-border h-full">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">Welcome For</h3>
            <div className="space-y-3">
              {crowds.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={18} className="text-primary" />
                  <span className="font-body text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Payments */}
        <AnimatedSection delay={0.1}>
          <div className="bg-card rounded-lg p-6 border border-border h-full">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">Payments</h3>
            <div className="space-y-3">
              {payments.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={18} className="text-primary" />
                  <span className="font-body text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full font-body">Free Parking</span>
              <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full font-body">Street Parking</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Hours */}
        <AnimatedSection delay={0.2}>
          <div className="bg-card rounded-lg p-6 border border-border h-full">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock size={20} className="text-primary" /> Operating Hours
            </h3>
            <div className="space-y-3">
              {hours.map(({ day, time }) => (
                <div key={day} className="flex justify-between">
                  <span className="font-body text-sm text-muted-foreground">{day}</span>
                  <span className="font-body text-sm font-medium text-foreground">{time}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 font-body text-xs text-muted-foreground italic">Usually a wait on weekends</p>
          </div>
        </AnimatedSection>

        {/* Atmosphere */}
        <AnimatedSection delay={0.3}>
          <div className="bg-card rounded-lg p-6 border border-border h-full">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">Dining Experience</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Breakfast", "Brunch", "Lunch", "Dinner", "Dessert"].map((t) => (
                <span key={t} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-body font-medium">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["Counter Service", "Table Service", "Seating", "Kids' Menu", "Restroom"].map((t) => (
                <span key={t} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full font-body">{t}</span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default InfoSection;

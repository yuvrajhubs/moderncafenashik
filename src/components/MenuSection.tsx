import { useState } from "react";
import { Leaf, Vegan } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Quick Bites"];

interface MenuItem {
  name: string;
  description: string;
  price: string;
  veg?: boolean;
  vegan?: boolean;
  organic?: boolean;
  category: string;
}

const menuItems: MenuItem[] = [
  { name: "Masala Dosa", description: "Crispy rice crepe with spiced potato filling", price: "₹120", veg: true, category: "Breakfast" },
  { name: "Poha", description: "Flattened rice with peanuts, curry leaves & lemon", price: "₹80", veg: true, organic: true, category: "Breakfast" },
  { name: "Idli Sambar", description: "Steamed rice cakes with lentil soup", price: "₹100", veg: true, vegan: true, category: "Breakfast" },
  { name: "Thali Special", description: "Complete meal with roti, rice, dal, sabzi & dessert", price: "₹250", veg: true, category: "Lunch" },
  { name: "Paneer Butter Masala", description: "Cottage cheese in rich tomato-cashew gravy", price: "₹220", veg: true, category: "Lunch" },
  { name: "Veg Biryani", description: "Fragrant basmati rice with seasonal vegetables", price: "₹200", veg: true, category: "Lunch" },
  { name: "Chole Bhature", description: "Spiced chickpeas with fried bread", price: "₹180", veg: true, category: "Dinner" },
  { name: "Palak Paneer", description: "Spinach gravy with fresh cottage cheese", price: "₹210", veg: true, category: "Dinner" },
  { name: "Gulab Jamun", description: "Deep-fried milk dumplings in rose syrup", price: "₹90", veg: true, category: "Dessert" },
  { name: "Shrikhand", description: "Saffron-flavored strained yogurt dessert", price: "₹110", veg: true, category: "Dessert" },
  { name: "Samosa", description: "Crispy pastry with spiced potato-pea filling", price: "₹50", veg: true, vegan: true, category: "Quick Bites" },
  { name: "Vada Pav", description: "Mumbai-style spiced potato burger", price: "₹60", veg: true, category: "Quick Bites" },
];

const MenuSection = () => {
  const [active, setActive] = useState("Breakfast");
  const filtered = menuItems.filter((i) => i.category === active);

  return (
    <section id="menu" className="py-20 md:py-28 bg-card mandala-pattern">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-2">Our Menu</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Crafted with <span className="text-secondary">Love</span>
          </h2>
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection delay={0.1} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-body text-sm px-5 py-2 rounded-full transition-all font-medium ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimatedSection>

        {/* Menu grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filtered.map((item, i) => (
            <AnimatedSection key={item.name} delay={i * 0.1}>
              <div className="bg-background rounded-lg p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-display text-lg font-bold text-primary">{item.price}</span>
                </div>
                <p className="font-body text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex gap-2">
                  {item.veg && (
                    <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                      <Leaf size={12} /> Veg
                    </span>
                  )}
                  {item.vegan && (
                    <span className="flex items-center gap-1 bg-secondary/10 text-secondary text-xs px-2 py-0.5 rounded-full">
                      <Vegan size={12} /> Vegan
                    </span>
                  )}
                  {item.organic && (
                    <span className="bg-accent/15 text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                      Organic
                    </span>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;

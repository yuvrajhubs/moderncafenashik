import { useState, useEffect } from "react";
import { Leaf, Vegan } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "./AnimatedSection";

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Quick Bites"];

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_organic: boolean;
  category: string;
}

const MenuSection = () => {
  const [active, setActive] = useState("Breakfast");
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    supabase.from("menu_items").select("*").order("sort_order").then(({ data }) => {
      if (data) setItems(data as unknown as MenuItem[]);
    });
  }, []);

  const filtered = items.filter((i) => i.category === active);

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
            <AnimatedSection key={item.id} delay={i * 0.1}>
              <div className="bg-background rounded-lg p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-display text-lg font-bold text-primary">₹{item.price}</span>
                </div>
                <p className="font-body text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex gap-2">
                  {item.is_vegetarian && (
                    <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                      <Leaf size={12} /> Veg
                    </span>
                  )}
                  {item.is_vegan && (
                    <span className="flex items-center gap-1 bg-secondary/10 text-secondary text-xs px-2 py-0.5 rounded-full">
                      <Vegan size={12} /> Vegan
                    </span>
                  )}
                  {item.is_organic && (
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

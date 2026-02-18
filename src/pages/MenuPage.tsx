import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Leaf, Vegan, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  image_url: string | null;
}

interface MenuPageSettings {
  title?: string;
  subtitle?: string;
  description?: string;
}

const MenuPage = () => {
  const [active, setActive] = useState("Breakfast");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<MenuPageSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      try {
        const { data: menuData, error: menuError } = await supabase
          .from("menu_items")
          .select("*")
          .order("sort_order");

        if (menuError) console.error("Menu fetch error:", menuError);
        if (!cancelled && menuData) {
          setItems(menuData as unknown as MenuItem[]);
        }

        const { data: settingsData, error: settingsError } = await supabase
          .from("site_settings")
          .select("*")
          .eq("key", "menu_page")
          .maybeSingle();

        if (settingsError) console.error("Settings fetch error:", settingsError);
        if (!cancelled && settingsData) {
          setSettings((settingsData.value as unknown as MenuPageSettings) || {});
        }
      } catch (e) {
        console.error("Failed to load menu data:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadData();
    return () => { cancelled = true; };
  }, []);

  const filtered = items.filter((i) => i.category === active);
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: items.filter((i) => i.category === cat).length,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative bg-cafe-charcoal py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cafe-charcoal via-cafe-charcoal/95 to-secondary/30" />
        <div className="absolute inset-0 mandala-pattern opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors font-body text-sm mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div>
            <p className="font-body text-accent text-sm tracking-[0.2em] uppercase mb-3">
              {settings.subtitle || "Modern Cafe Nashik"}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              {settings.title || "Our Menu"}
            </h1>
            <p className="font-body text-primary-foreground/70 max-w-xl text-lg">
              {settings.description || "Explore our carefully curated selection of dishes, crafted with the freshest ingredients and a love for authentic flavors."}
            </p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {categoryCounts.map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`font-body text-sm px-5 py-2.5 rounded-full transition-all font-medium whitespace-nowrap ${
                  active === name
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-background text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {name}
                {!loading && <span className="ml-1.5 text-xs opacity-70">({count})</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-card rounded-xl p-6 border border-border animate-pulse h-40" />
            ))}
          </div>
        ) : (
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              {active}
              <span className="text-muted-foreground font-body text-base font-normal ml-3">
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </span>
            </h2>

            {filtered.length === 0 ? (
              <p className="font-body text-muted-foreground text-center py-16">
                No items in this category yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-xl transition-all group overflow-hidden"
                  >
                    {item.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-display text-xl font-bold text-primary ml-4 shrink-0">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.is_vegetarian && (
                          <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium">
                            <Leaf size={12} /> Veg
                          </span>
                        )}
                        {item.is_vegan && (
                          <span className="flex items-center gap-1 bg-secondary/10 text-secondary text-xs px-2.5 py-1 rounded-full font-medium">
                            <Vegan size={12} /> Vegan
                          </span>
                        )}
                        {item.is_organic && (
                          <span className="bg-accent/15 text-accent-foreground text-xs px-2.5 py-1 rounded-full font-medium">
                            Organic
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="border-t border-border py-8 text-center">
        <Link
          to="/"
          className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to Modern Cafe Nashik
        </Link>
      </div>
    </div>
  );
};

export default MenuPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Trash2, Plus, LogOut } from "lucide-react";

// ─── Types (manual, since auto-gen types may lag) ───
interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_organic: boolean;
  sort_order: number;
}

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  sort_order: number;
}

interface GalleryImage {
  id: string;
  image_url: string;
  alt: string;
  sort_order: number;
}

// ─── Tabs ───
const tabs = ["Menu", "Testimonials", "Gallery", "Site Settings"] as const;
type Tab = (typeof tabs)[number];

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Menu");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin", { replace: true });
    }
  }, [loading, user, isAdmin, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-body text-muted-foreground">Loading…</div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-cafe-charcoal text-primary-foreground py-4 px-6 flex items-center justify-between">
        <a href="/" className="font-display text-xl font-bold">
          MODERN<span className="text-accent"> CAFE</span>
          <span className="font-body text-xs ml-3 text-primary-foreground/60">Admin</span>
        </a>
        <Button variant="ghost" size="sm" onClick={() => signOut().then(() => navigate("/admin"))} className="text-primary-foreground/70 hover:text-primary-foreground">
          <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex gap-1 px-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-body text-sm px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                tab === t ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {tab === "Menu" && <MenuTab />}
        {tab === "Testimonials" && <TestimonialsTab />}
        {tab === "Gallery" && <GalleryTab />}
        {tab === "Site Settings" && <SiteSettingsTab />}
      </div>
    </div>
  );
};

// ─── Menu Tab ───
const MenuTab = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const { data } = await supabase.from("menu_items").select("*").order("sort_order") as { data: MenuItem[] | null };
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const addItem = async () => {
    const { error } = await supabase.from("menu_items").insert({ name: "New Item", category: "Breakfast", description: "", price: 0, sort_order: items.length } as any);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    fetch();
  };

  const updateItem = async (id: string, field: string, value: any) => {
    await supabase.from("menu_items").update({ [field]: value } as any).eq("id", id);
  };

  const deleteItem = async (id: string) => {
    await supabase.from("menu_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <p className="font-body text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Menu Items</h2>
        <Button onClick={addItem} size="sm"><Plus size={16} className="mr-1" /> Add Item</Button>
      </div>
      {items.length === 0 && <p className="font-body text-muted-foreground">No items yet. Click "Add Item" to start.</p>}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <Label className="font-body text-xs">Name</Label>
                <Input defaultValue={item.name} onBlur={(e) => updateItem(item.id, "name", e.target.value)} />
              </div>
              <div>
                <Label className="font-body text-xs">Category</Label>
                <Input defaultValue={item.category} onBlur={(e) => updateItem(item.id, "category", e.target.value)} />
              </div>
              <div>
                <Label className="font-body text-xs">Price (₹)</Label>
                <Input type="number" defaultValue={item.price} onBlur={(e) => updateItem(item.id, "price", Number(e.target.value))} />
              </div>
              <div className="flex items-end gap-2">
                <label className="flex items-center gap-1 font-body text-xs"><input type="checkbox" defaultChecked={item.is_vegetarian} onChange={(e) => updateItem(item.id, "is_vegetarian", e.target.checked)} /> Veg</label>
                <label className="flex items-center gap-1 font-body text-xs"><input type="checkbox" defaultChecked={item.is_vegan} onChange={(e) => updateItem(item.id, "is_vegan", e.target.checked)} /> Vegan</label>
                <label className="flex items-center gap-1 font-body text-xs"><input type="checkbox" defaultChecked={item.is_organic} onChange={(e) => updateItem(item.id, "is_organic", e.target.checked)} /> Organic</label>
                <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)} className="text-destructive ml-auto"><Trash2 size={16} /></Button>
              </div>
            </div>
            <div className="mt-2">
              <Label className="font-body text-xs">Description</Label>
              <Input defaultValue={item.description} onBlur={(e) => updateItem(item.id, "description", e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Testimonials Tab ───
const TestimonialsTab = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order") as { data: Testimonial[] | null };
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    await supabase.from("testimonials").insert({ name: "Guest", quote: "Amazing experience!", rating: 5, sort_order: items.length } as any);
    load();
  };

  const update = async (id: string, field: string, value: any) => {
    await supabase.from("testimonials").update({ [field]: value } as any).eq("id", id);
  };

  const remove = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    setItems((p) => p.filter((t) => t.id !== id));
  };

  if (loading) return <p className="font-body text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Testimonials</h2>
        <Button onClick={add} size="sm"><Plus size={16} className="mr-1" /> Add</Button>
      </div>
      <div className="space-y-4">
        {items.map((t) => (
          <div key={t.id} className="bg-card border border-border rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label className="font-body text-xs">Name</Label>
                <Input defaultValue={t.name} onBlur={(e) => update(t.id, "name", e.target.value)} />
              </div>
              <div>
                <Label className="font-body text-xs">Rating (1-5)</Label>
                <Input type="number" min={1} max={5} defaultValue={t.rating} onBlur={(e) => update(t.id, "rating", Number(e.target.value))} />
              </div>
              <div className="flex items-end">
                <Button variant="ghost" size="icon" onClick={() => remove(t.id)} className="text-destructive ml-auto"><Trash2 size={16} /></Button>
              </div>
            </div>
            <div className="mt-2">
              <Label className="font-body text-xs">Quote</Label>
              <Textarea defaultValue={t.quote} onBlur={(e) => update(t.id, "quote", e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Gallery Tab ───
const GalleryTab = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("sort_order") as { data: GalleryImage[] | null };
    setImages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `gallery/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("cafe-uploads").upload(path, file);
    if (upErr) { toast({ title: "Upload failed", description: upErr.message, variant: "destructive" }); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("cafe-uploads").getPublicUrl(path);
    await supabase.from("gallery_images").insert({ image_url: urlData.publicUrl, alt: file.name, sort_order: images.length } as any);
    setUploading(false);
    load();
  };

  const remove = async (img: GalleryImage) => {
    await supabase.from("gallery_images").delete().eq("id", img.id);
    setImages((p) => p.filter((i) => i.id !== img.id));
  };

  if (loading) return <p className="font-body text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Gallery</h2>
        <label className="cursor-pointer">
          <Button size="sm" asChild disabled={uploading}><span><Plus size={16} className="mr-1" /> {uploading ? "Uploading…" : "Upload Image"}</span></Button>
          <input type="file" accept="image/*" className="hidden" onChange={upload} />
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group rounded-lg overflow-hidden border border-border">
            <img src={img.image_url} alt={img.alt} className="w-full aspect-square object-cover" />
            <button
              onClick={() => remove(img)}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Site Settings Tab ───
const SiteSettingsTab = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("site_settings").select("*") as { data: { key: string; value: any }[] | null };
    const map: Record<string, any> = {};
    data?.forEach((s) => { map[s.key] = s.value; });
    setSettings(map);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveSetting = async (key: string, value: any) => {
    const { error } = await supabase.from("site_settings").upsert({ key, value } as any, { onConflict: "key" });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Saved!" });
  };

  if (loading) return <p className="font-body text-muted-foreground">Loading…</p>;

  const hero = settings.hero || {};
  const menuPage = settings.menu_page || {};
  const about = settings.about || {};
  const contact = settings.contact || {};

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Hero */}
      <section>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Hero Section</h2>
        <div className="space-y-3">
          <div>
            <Label className="font-body text-xs">Subtitle</Label>
            <Input defaultValue={hero.subtitle || ""} onBlur={(e) => saveSetting("hero", { ...hero, subtitle: e.target.value })} />
          </div>
          <div>
            <Label className="font-body text-xs">Tagline</Label>
            <Input defaultValue={hero.tagline || ""} onBlur={(e) => saveSetting("hero", { ...hero, tagline: e.target.value })} />
          </div>
        </div>
      </section>

      {/* Menu Page */}
      <section>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Menu Page</h2>
        <div className="space-y-3">
          <div>
            <Label className="font-body text-xs">Page Title</Label>
            <Input defaultValue={menuPage.title || ""} placeholder="Our Menu" onBlur={(e) => saveSetting("menu_page", { ...menuPage, title: e.target.value })} />
          </div>
          <div>
            <Label className="font-body text-xs">Subtitle</Label>
            <Input defaultValue={menuPage.subtitle || ""} placeholder="Modern Cafe Nashik" onBlur={(e) => saveSetting("menu_page", { ...menuPage, subtitle: e.target.value })} />
          </div>
          <div>
            <Label className="font-body text-xs">Description</Label>
            <Textarea defaultValue={menuPage.description || ""} placeholder="Explore our carefully curated selection..." onBlur={(e) => saveSetting("menu_page", { ...menuPage, description: e.target.value })} />
          </div>
        </div>
      </section>

      {/* About */}
      <section>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">About Section</h2>
        <div className="space-y-3">
          <div>
            <Label className="font-body text-xs">Description</Label>
            <Textarea defaultValue={about.description || ""} onBlur={(e) => saveSetting("about", { ...about, description: e.target.value })} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Info</h2>
        <div className="space-y-3">
          <div>
            <Label className="font-body text-xs">Address</Label>
            <Input defaultValue={contact.address || ""} onBlur={(e) => saveSetting("contact", { ...contact, address: e.target.value })} />
          </div>
          <div>
            <Label className="font-body text-xs">Phone</Label>
            <Input defaultValue={contact.phone || ""} onBlur={(e) => saveSetting("contact", { ...contact, phone: e.target.value })} />
          </div>
          <div>
            <Label className="font-body text-xs">Email</Label>
            <Input defaultValue={contact.email || ""} onBlur={(e) => saveSetting("contact", { ...contact, email: e.target.value })} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

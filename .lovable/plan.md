

# Modern Cafe Nashik — Landing Page

A vibrant, bold, and classy Indian-themed landing page with engaging animations and a full admin panel for content customization.

## Design Direction
- **Vibrant & Bold** color palette: rich saffron/turmeric oranges, deep burgundy/maroon, warm golds, with dark charcoal accents
- Indian-inspired decorative elements (mandala patterns, paisley borders) used tastefully for a classy feel
- Smooth scroll animations (fade-in, slide-up, parallax) on each section as users scroll
- Google Fonts pairing: elegant serif for headings (e.g. Playfair Display) + clean sans-serif for body text

## Landing Page Sections

### 1. Hero Section
- Full-screen hero with customizable background image, cafe name, tagline, and CTA button
- Animated text entrance with a subtle overlay pattern

### 2. About Section
- Cafe story/description with customizable text and image
- Highlights badges: Great Coffee, Great Dessert, Great Tea Selection
- Atmosphere tags: Casual, Cozy, Quiet, Trendy

### 3. Menu Highlights
- Categorized menu cards (Breakfast, Lunch, Dinner, Dessert, Quick Bites)
- Each item has a photo, name, description, and price — all editable
- Vegetarian/Vegan/Organic badges on items

### 4. Gallery
- Masonry-style photo grid with lightbox view
- Admin can add/remove/reorder images

### 5. Testimonials
- Carousel of customer reviews with name, rating, and quote
- Admin can manage testimonials

### 6. Info & Services
- Service options (Dine-in, Takeaway, Delivery, etc.) displayed as icon cards
- Accessibility info, parking, payment methods, and crowd/family-friendly details
- Operating hours and contact info

### 7. Contact / Footer
- Location map placeholder, phone, email, social media links
- All links customizable by the admin

## Admin Panel (Backend Required)
- Protected admin dashboard behind a login page
- Sections to edit: Hero content, About text, Menu items, Gallery photos, Testimonials, Contact info, and Service details
- Uses Supabase (via Lovable Cloud) for:
  - **Authentication** — admin login
  - **Database** — storing all customizable content (menu items, testimonials, gallery URLs, site settings)
  - **Storage** — uploading and managing photos (hero, menu, gallery)

## Pages & Routing
- `/` — Public landing page
- `/admin` — Admin login
- `/admin/dashboard` — Content management panel with tabs for each section


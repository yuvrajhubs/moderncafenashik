
-- The previous migration partially ran. Drop ALL existing policies (with and without trailing spaces) and recreate.

-- menu_items: drop all existing
DROP POLICY IF EXISTS "Anyone can read menu" ON public.menu_items;
DROP POLICY IF EXISTS "Admins can insert menu" ON public.menu_items;
DROP POLICY IF EXISTS "Admins can update menu" ON public.menu_items;
DROP POLICY IF EXISTS "Admins can delete menu" ON public.menu_items;

-- Recreate permissive policies for menu_items
CREATE POLICY "Anyone can read menu"
  ON public.menu_items FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert menu"
  ON public.menu_items FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update menu"
  ON public.menu_items FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete menu"
  ON public.menu_items FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- gallery_images
DROP POLICY IF EXISTS "Anyone can read gallery" ON public.gallery_images;
DROP POLICY IF EXISTS "Admins can insert gallery" ON public.gallery_images;
DROP POLICY IF EXISTS "Admins can update gallery" ON public.gallery_images;
DROP POLICY IF EXISTS "Admins can delete gallery" ON public.gallery_images;

CREATE POLICY "Anyone can read gallery"
  ON public.gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert gallery"
  ON public.gallery_images FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery"
  ON public.gallery_images FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery"
  ON public.gallery_images FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- testimonials
DROP POLICY IF EXISTS "Anyone can read testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can delete testimonials" ON public.testimonials;

CREATE POLICY "Anyone can read testimonials"
  ON public.testimonials FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- site_settings
DROP POLICY IF EXISTS "Anyone can read settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can insert settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can delete settings" ON public.site_settings;

CREATE POLICY "Anyone can read settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update settings"
  ON public.site_settings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete settings"
  ON public.site_settings FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- user_roles
DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;

CREATE POLICY "Admins can read all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own role"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid());

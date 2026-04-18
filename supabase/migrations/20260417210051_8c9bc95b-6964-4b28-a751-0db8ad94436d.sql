-- Seats tracking on batches
ALTER TABLE public.batches ADD COLUMN IF NOT EXISTS seats_total INTEGER NOT NULL DEFAULT 50;
ALTER TABLE public.batches ADD COLUMN IF NOT EXISTS seats_filled INTEGER NOT NULL DEFAULT 0;

-- Display order for testimonials
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 0;

-- Notes on leads
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes TEXT;

-- New settings rows
INSERT INTO public.settings (key, value) VALUES
  ('whatsapp_group_link', 'https://wa.me/917909228688'),
  ('enrollment_link', 'https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform')
ON CONFLICT (key) DO NOTHING;

-- Universities table
CREATE TABLE IF NOT EXISTS public.universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT 'Central University',
  streams TEXT NOT NULL,
  seats_info TEXT,
  estimated_cutoff TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read universities"
ON public.universities
FOR SELECT
USING (true);

CREATE POLICY "Admins manage universities"
ON public.universities
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.universities (name, tag, streams, seats_info, estimated_cutoff, display_order) VALUES
('Delhi University', 'Central University', 'All Streams', '80+ Colleges', '90%+', 1),
('JNU', 'Central University', 'Humanities & Sciences', 'Research-focused', 'Competitive', 2),
('BHU Varanasi', 'Central University', 'All Streams', '140+ Programmes', '85%+', 3),
('Jamia Millia Islamia', 'Central University', 'Arts & Sciences', 'Merit-based', '80%+', 4),
('EFLU Hyderabad', 'Central University', 'Language Specialization', 'Limited Seats', '75%+', 5),
('Pondicherry University', 'Central University', 'All Streams', 'South India Top Pick', '75%+', 6),
('AMU Aligarh', 'Central University', 'All Streams', '100+ Programmes', '80%+', 7),
('Hyderabad Central University', 'Central University', 'Sciences & Humanities', 'Research-focused', '85%+', 8);
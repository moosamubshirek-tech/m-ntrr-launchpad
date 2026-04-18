-- Create app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Announcements
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Admins manage announcements" ON public.announcements FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Batches
CREATE TABLE public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  exam TEXT NOT NULL,
  price_original INTEGER NOT NULL,
  price_early_bird INTEGER NOT NULL,
  early_bird_active BOOLEAN NOT NULL DEFAULT true,
  features TEXT[] NOT NULL DEFAULT '{}',
  enrollment_link TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read batches" ON public.batches FOR SELECT USING (true);
CREATE POLICY "Admins manage batches" ON public.batches FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Schedule
CREATE TABLE public.schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  stream TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read schedule" ON public.schedule FOR SELECT USING (true);
CREATE POLICY "Admins manage schedule" ON public.schedule FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Toppers
CREATE TABLE public.toppers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  rank TEXT NOT NULL,
  university TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.toppers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read toppers" ON public.toppers FOR SELECT USING (true);
CREATE POLICY "Admins manage toppers" ON public.toppers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_url TEXT NOT NULL,
  student_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Leads
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  batch_interest TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage leads" ON public.leads FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Settings
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL
);
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON public.settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES
  ('phone', '7909228688'),
  ('address', 'Nas Arcade, Kurial Lane, Cherooty Rd, Mananchira, Kozhikode, Kerala 673001'),
  ('instagram', '@mentrr_learning'),
  ('youtube', '@mentrrlearning'),
  ('website', 'www.mentrr.in'),
  ('tagline', 'Prepare the mêntrr. way!'),
  ('exam_date', '2026-05-11');

-- Insert default batches
INSERT INTO public.batches (name, exam, price_original, price_early_bird, early_bird_active, features, enrollment_link) VALUES
  ('CUET UG 2026 Crash Batch', 'CUET', 8500, 5999, true,
   ARRAY['Daily Live Sessions', 'Recorded Classes', 'Personal Mentorship', 'Chapter Wise Notes', 'Mock Tests', 'PYQ Discussion', 'Strategy Sessions'],
   'https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform'),
  ('NCET 2026 Crash Batch', 'NCET', 8500, 4999, true,
   ARRAY['Daily Live Sessions', 'Recorded Classes', 'Personal Mentorship', 'Chapter Wise Notes', 'Mock Tests', 'PYQ Discussion', 'Strategy Sessions'],
   'https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform');

-- Insert default announcement
INSERT INTO public.announcements (text, active) VALUES
  ('🔥 Early Bird Offer Ending Soon — Limited Seats!', true);

-- Insert default toppers
INSERT INTO public.toppers (name, subject, rank, university, photo_url) VALUES
  ('Niveda MR', 'English', 'AIR 1', 'Delhi University', null),
  ('Kalyani SH', 'Biology', 'AIR 1', 'Delhi University', null);
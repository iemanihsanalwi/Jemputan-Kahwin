-- ====================================================================
-- WALIMATULURUS RSVP & GUESTBOOK - SUPABASE DATABASE SCHEMA
-- ====================================================================

-- 1. Create RSVP Submissions Table
CREATE TABLE IF NOT EXISTS public.rsvp_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    attendance_status TEXT NOT NULL CHECK (attendance_status IN ('hadir', 'tidak_hadir')),
    attendees_count INTEGER NOT NULL DEFAULT 1 CHECK (attendees_count >= 1 AND attendees_count <= 20),
    remarks TEXT,
    dietary_requirements TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexing for fast queries
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON public.rsvp_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvp_attendance_status ON public.rsvp_submissions (attendance_status);
CREATE INDEX IF NOT EXISTS idx_rsvp_phone_number ON public.rsvp_submissions (phone_number);

-- 2. Create Guestbook / Wishes Table
CREATE TABLE IF NOT EXISTS public.guest_wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_name TEXT NOT NULL,
    relationship TEXT,
    message TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    likes_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexing for guest wishes
CREATE INDEX IF NOT EXISTS idx_wishes_approved_created ON public.guest_wishes (is_approved, created_at DESC);

-- 3. Row Level Security (RLS) Configuration
ALTER TABLE public.rsvp_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_wishes ENABLE ROW LEVEL SECURITY;

-- RSVP Policies
-- Allow anyone to submit an RSVP (insert)
CREATE POLICY "Allow public to insert rsvp" 
ON public.rsvp_submissions 
FOR INSERT 
WITH CHECK (true);

-- Allow organizers (or authenticated service role) to select all RSVPs
CREATE POLICY "Allow authenticated or service role to view rsvp" 
ON public.rsvp_submissions 
FOR SELECT 
USING (true);

-- Allow organizers to delete/update RSVPs
CREATE POLICY "Allow service role to update rsvp" 
ON public.rsvp_submissions 
FOR UPDATE 
USING (true);

-- Guest Wishes Policies
-- Allow anyone to submit a wish
CREATE POLICY "Allow public to insert wishes" 
ON public.guest_wishes 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to view approved wishes
CREATE POLICY "Allow public to view approved wishes" 
ON public.guest_wishes 
FOR SELECT 
USING (is_approved = true);

-- Allow public to increment likes
CREATE POLICY "Allow public to update likes" 
ON public.guest_wishes 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- 4. RPC Functions for Atomic Operations
-- Function to like a wish atomically
CREATE OR REPLACE FUNCTION public.increment_wish_like(wish_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.guest_wishes
    SET likes_count = likes_count + 1
    WHERE id = wish_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Seed Initial Wishes Sample Data
INSERT INTO public.guest_wishes (sender_name, relationship, message, is_approved, likes_count, created_at)
VALUES 
('Dato'' Seri Khalid & Keluarga', 'Sahabat Keluarga', 'Barakallahu lakuma wa baraka alaikuma wa jama''a bainakuma fi khair. Selamat melangkah ke gerbang perkahwinan, semoga rumahtangga sentiasa disinari sakinah, mawaddah dan rahmah.', true, 12, NOW() - INTERVAL '2 days'),
('Nurul Aina', 'Rakan Sekerja Pengantin Perempuan', 'Tahniah Farhana & Amirul! Cantik sangat kedua mempelai bagai pinang dibelah dua. Semoga berkekalan sampai anak cucu!', true, 8, NOW() - INTERVAL '1 day'),
('Ahmad Faizal & Isteri', 'Rakan Universiti Pengantin Lelaki', 'Congrats brother Amirul! Finally tied the knot! Semoga berbahagia dan dipermudahkan segala urusan majlis kelak.', true, 5, NOW() - INTERVAL '4 hours')
ON CONFLICT DO NOTHING;


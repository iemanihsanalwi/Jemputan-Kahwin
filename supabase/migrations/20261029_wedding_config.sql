-- ====================================================================
-- MIGRATION: DYNAMIC WEDDING CONFIGURATION TABLE
-- ====================================================================

-- 1. Create wedding_config table with single fixed row (id = 1)
CREATE TABLE IF NOT EXISTS public.wedding_config (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    config JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.wedding_config ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow anyone (public/guests) to read the active wedding configuration
DROP POLICY IF EXISTS "Allow public read access to wedding_config" ON public.wedding_config;
CREATE POLICY "Allow public read access to wedding_config" 
ON public.wedding_config 
FOR SELECT 
USING (true);

-- Allow upserting configuration (can be restricted to authenticated/service role, or public with check)
DROP POLICY IF EXISTS "Allow insert to wedding_config" ON public.wedding_config;
CREATE POLICY "Allow insert to wedding_config" 
ON public.wedding_config 
FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update to wedding_config" ON public.wedding_config;
CREATE POLICY "Allow update to wedding_config" 
ON public.wedding_config 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- 4. Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_wedding_config_updated_at ON public.wedding_config;
CREATE TRIGGER trigger_wedding_config_updated_at
BEFORE UPDATE ON public.wedding_config
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

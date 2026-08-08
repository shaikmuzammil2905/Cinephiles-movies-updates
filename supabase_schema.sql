-- TELANGANA BOX OFFICE SUPABASE DATABASE SCHEMA

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insert default categories if not existing
INSERT INTO public.categories (name, slug, description) VALUES
    ('Top Story', 'top-story', 'Major headline movie news'),
    ('Movie News', 'movie-news', 'General cinema and trade updates'),
    ('OTT Updates', 'ott-updates', 'Digital release news and streaming alerts'),
    ('Reviews', 'reviews', 'Film ratings and box office reviews'),
    ('Box Office', 'box-office', 'Collections and record breakdowns'),
    ('Trailers', 'trailers', 'Video teasers and trailer releases'),
    ('Upcoming Releases', 'upcoming-releases', 'Theatrical release schedules')
ON CONFLICT (slug) DO NOTHING;

-- 3. Create updates table
CREATE TABLE IF NOT EXISTS public.updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL DEFAULT 'Movie News',
    short_description TEXT,
    content TEXT,
    featured_image_url TEXT,
    featured_image_public_id TEXT,
    author TEXT DEFAULT 'Admin',
    status TEXT NOT NULL DEFAULT 'published', -- 'published' or 'draft'
    tags TEXT,
    extra_data JSONB DEFAULT '{}'::jsonb, -- Store review rating, director, cast, platform, youtubeId, releaseDate etc.
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Performance Indexes
CREATE INDEX IF NOT EXISTS idx_updates_slug ON public.updates(slug);
CREATE INDEX IF NOT EXISTS idx_updates_category ON public.updates(category);
CREATE INDEX IF NOT EXISTS idx_updates_status ON public.updates(status);
CREATE INDEX IF NOT EXISTS idx_updates_published_at ON public.updates(published_at DESC);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies: Allow public full read for published updates, authenticated users full CRUD
DROP POLICY IF EXISTS "Public can view published updates" ON public.updates;
CREATE POLICY "Public can view published updates"
ON public.updates FOR SELECT
USING (status = 'published' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can insert updates" ON public.updates;
CREATE POLICY "Authenticated users can insert updates"
ON public.updates FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update updates" ON public.updates;
CREATE POLICY "Authenticated users can update updates"
ON public.updates FOR UPDATE
USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete updates" ON public.updates;
CREATE POLICY "Authenticated users can delete updates"
ON public.updates FOR DELETE
USING (true);

-- Category Policies
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories"
ON public.categories FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users manage categories" ON public.categories;
CREATE POLICY "Authenticated users manage categories"
ON public.categories FOR ALL
USING (true);

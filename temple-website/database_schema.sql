-- Supabase Database Schema for DevaVriksha Temple Website

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    devotee_name TEXT NOT NULL,
    gotra TEXT,
    pooja_type TEXT NOT NULL,
    booking_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Donations Table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    devotee_name TEXT NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    seva_type TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Daily Darshan/Updates Table
CREATE TABLE IF NOT EXISTS public.darshans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (optional - default disabled for easy prototyping)
-- ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.darshans ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all read/write for demo purposes (standard Supabase dev configuration)
-- CREATE POLICY "Allow public read/write" ON public.bookings FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow public read/write" ON public.donations FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow public read" ON public.darshans FOR SELECT USING (true);

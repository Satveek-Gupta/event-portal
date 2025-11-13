-- Run this SQL in your Supabase SQL Editor to create the attendees table

CREATE TABLE IF NOT EXISTS attendees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  club TEXT NOT NULL,
  role TEXT NOT NULL,
  comments TEXT DEFAULT '',
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_attendees_email ON attendees(email);

-- Create index on registered_at for sorting
CREATE INDEX IF NOT EXISTS idx_attendees_registered_at ON attendees(registered_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for server-side use)
-- In production, you should restrict this based on your needs
CREATE POLICY "Allow all operations for service role"
ON attendees
FOR ALL
USING (true)
WITH CHECK (true);


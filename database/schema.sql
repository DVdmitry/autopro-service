-- AutoPro Service — Database Schema
-- Supabase PostgreSQL

CREATE TABLE IF NOT EXISTS mechanics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  experience INTEGER NOT NULL DEFAULT 0,
  rating DECIMAL(2,1) NOT NULL DEFAULT 5.0,
  review_count INTEGER NOT NULL DEFAULT 0,
  avatar TEXT,
  bio TEXT,
  languages TEXT[] DEFAULT '{"Polish","English"}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  icon TEXT
);

CREATE TABLE IF NOT EXISTS service_options (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL REFERENCES services(id),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('budget', 'standard', 'premium')),
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  compatible_makes TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS mechanic_services (
  mechanic_id TEXT NOT NULL REFERENCES mechanics(id),
  service_id TEXT NOT NULL REFERENCES services(id),
  PRIMARY KEY (mechanic_id, service_id)
);

CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  mechanic_id TEXT NOT NULL REFERENCES mechanics(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_working BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS schedule_breaks (
  id SERIAL PRIMARY KEY,
  mechanic_id TEXT NOT NULL REFERENCES mechanics(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  confirmation_number TEXT UNIQUE NOT NULL,
  mechanic_id TEXT REFERENCES mechanics(id),
  service_id TEXT REFERENCES services(id),
  selected_option_id TEXT REFERENCES service_options(id),
  slot_date TEXT NOT NULL,
  slot_start_time TEXT NOT NULL,
  slot_end_time TEXT NOT NULL,
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  license_plate TEXT,
  mileage INTEGER,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  problem_description TEXT,
  urgency TEXT DEFAULT 'normal',
  contact_method TEXT DEFAULT 'phone',
  status TEXT DEFAULT 'pending',
  idempotency_key TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(slot_date, mechanic_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_service_options_service ON service_options(service_id);
CREATE INDEX IF NOT EXISTS idx_schedules_mechanic ON schedules(mechanic_id, day_of_week);

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Doctor {
  id: string
  name: string
  email: string
  specialty: string
  avatar_url?: string
  google_calendar_connected: boolean
  created_at: string
}

export interface Lead {
  id: string
  doctor_id: string
  name: string
  phone: string
  email?: string
  funnel_stage: number
  last_message?: string
  last_message_at?: string
  source: 'whatsapp' | 'website' | 'referral' | 'other'
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  doctor_id: string
  lead_id?: string
  patient_name: string
  appointment_type: 'consultation' | 'followup' | 'procedure' | 'other'
  start_time: string
  end_time: string
  notes?: string
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  google_event_id?: string
  created_at: string
}

export interface Activity {
  id: string
  doctor_id: string
  type: 'message' | 'appointment' | 'lead_moved' | 'conversion' | 'calendar_sync'
  description: string
  metadata?: Record<string, any>
  created_at: string
}

export interface DailyMetrics {
  id: string
  doctor_id: string
  date: string
  patients_seen: number
  messages_received: number
  active_leads: number
  conversions: number
}

// Supabase SQL to create tables
export const setupSQL = `
-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  specialty TEXT,
  avatar_url TEXT,
  google_calendar_connected BOOLEAN DEFAULT FALSE,
  google_refresh_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  funnel_stage INTEGER DEFAULT 1 CHECK (funnel_stage >= 1 AND funnel_stage <= 5),
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  source TEXT DEFAULT 'whatsapp',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  patient_name TEXT NOT NULL,
  appointment_type TEXT DEFAULT 'consultation',
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'scheduled',
  google_event_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily metrics table
CREATE TABLE IF NOT EXISTS daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  patients_seen INTEGER DEFAULT 0,
  messages_received INTEGER DEFAULT 0,
  active_leads INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  UNIQUE(doctor_id, date)
);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_doctor ON leads(doctor_id);
CREATE INDEX IF NOT EXISTS idx_leads_funnel ON leads(funnel_stage);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(start_time);
CREATE INDEX IF NOT EXISTS idx_activities_doctor ON activities(doctor_id);
CREATE INDEX IF NOT EXISTS idx_activities_created ON activities(created_at DESC);
`

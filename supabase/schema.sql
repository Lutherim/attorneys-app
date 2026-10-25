-- ====================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR NTEBALENG THOBAKGALE ATTORNEYS
-- Practice Address: 162 Marshall Street, Polokwane, 0700, Limpopo, South Africa
-- Director: Ntebaleng Thobakgale | LLB (UL) | Attorneys | Conveyancers | Notaries
-- Telephone: 015 888 3356 | Mobile/WhatsApp: +27 72 378 6975
-- Email: info@ntattorneys.co.za
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------
-- CUSTOM ENUM TYPES
-- ---------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE service_category AS ENUM (
        'Property & Conveyancing',
        'Estates & Trusts',
        'Litigation & Dispute Resolution',
        'Family Law',
        'Criminal & Bail',
        'Personal Injury & Claims',
        'Commercial & Contracts',
        'Financial & Debt'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM (
        'pending_confirmation',
        'confirmed',
        'rescheduled',
        'completed',
        'cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE consultation_type AS ENUM (
        'in_person',
        'virtual_zoom',
        'phone_call',
        'urgent_police_station_callout'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE case_urgency AS ENUM (
        'standard',
        'urgent',
        'emergency_arrest'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ---------------------------------------------------------------------
-- TABLE: services
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    category service_category NOT NULL,
    icon_name TEXT NOT NULL,
    estimated_duration_min INTEGER DEFAULT 60,
    base_consultation_fee NUMERIC(10, 2) DEFAULT 0.00,
    is_urgent_capable BOOLEAN DEFAULT FALSE,
    required_documents TEXT[] DEFAULT ARRAY[]::TEXT[],
    key_deliverables TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- TABLE: team_members
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    role_description TEXT NOT NULL,
    qualifications TEXT NOT NULL,
    admissions TEXT[] DEFAULT ARRAY[]::TEXT[],
    bio TEXT NOT NULL,
    specializations TEXT[] DEFAULT ARRAY[]::TEXT[],
    email TEXT,
    phone TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- TABLE: consultation_bookings
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    service_title TEXT NOT NULL,
    consultation_type consultation_type DEFAULT 'in_person',
    urgency case_urgency DEFAULT 'standard',
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    case_summary TEXT NOT NULL,
    status booking_status DEFAULT 'pending_confirmation',
    assigned_attorney_id UUID REFERENCES public.team_members(id) ON DELETE SET NULL,
    internal_notes TEXT,
    whatsapp_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- TABLE: case_inquiries (Contact / Intake Forms)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.case_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    service_interest TEXT,
    is_urgent_arrest BOOLEAN DEFAULT FALSE,
    ip_hash TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- TABLE: professional_certifications
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.professional_certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    regulatory_body TEXT NOT NULL,
    title TEXT NOT NULL,
    certificate_number TEXT,
    issuing_authority TEXT NOT NULL,
    year_awarded INTEGER,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'Active & In Good Standing',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- TABLE: faqs (Questions & Answers)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- TABLE: practice_locations
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.practice_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    office_name TEXT NOT NULL DEFAULT 'Head Office - Polokwane',
    street_address TEXT NOT NULL DEFAULT '162 Marshall Street',
    city TEXT NOT NULL DEFAULT 'Polokwane',
    postal_code TEXT NOT NULL DEFAULT '0700',
    province TEXT NOT NULL DEFAULT 'Limpopo',
    country TEXT NOT NULL DEFAULT 'South Africa',
    latitude NUMERIC(10, 7) DEFAULT -23.9044,
    longitude NUMERIC(10, 7) DEFAULT 29.4689,
    phone TEXT NOT NULL DEFAULT '015 888 3356',
    mobile_whatsapp TEXT NOT NULL DEFAULT '+27 72 378 6975',
    email TEXT NOT NULL DEFAULT 'info@ntattorneys.co.za',
    opening_hours_weekday TEXT NOT NULL DEFAULT '08:00 - 17:00',
    opening_hours_weekend TEXT NOT NULL DEFAULT 'Emergency Bail & Urgent Court Matters 24/7'
);

-- ---------------------------------------------------------------------
-- AUTOMATIC TIMESTAMPS TRIGGER
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_modtime
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_modtime
    BEFORE UPDATE ON public.team_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_modtime
    BEFORE UPDATE ON public.consultation_bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ---------------------------------------------------------------------
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_locations ENABLE ROW LEVEL SECURITY;

-- Public read access for marketing content
CREATE POLICY "Public services are readable by anyone"
    ON public.services FOR SELECT USING (is_active = true);

CREATE POLICY "Team members are readable by anyone"
    ON public.team_members FOR SELECT USING (is_active = true);

CREATE POLICY "Certifications are readable by anyone"
    ON public.professional_certifications FOR SELECT USING (true);

CREATE POLICY "FAQs are readable by anyone"
    ON public.faqs FOR SELECT USING (true);

CREATE POLICY "Practice locations are readable by anyone"
    ON public.practice_locations FOR SELECT USING (true);

-- Public insert access for prospective client bookings and inquiries
CREATE POLICY "Clients can create bookings"
    ON public.consultation_bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Clients can submit inquiries"
    ON public.case_inquiries FOR INSERT WITH CHECK (true);

-- ---------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- ---------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_bookings_preferred_date ON public.consultation_bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.consultation_bookings(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.case_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);

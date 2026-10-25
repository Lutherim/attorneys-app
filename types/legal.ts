export type ServiceCategory =
  | 'Property & Conveyancing'
  | 'Estates & Trusts'
  | 'Litigation & Dispute Resolution'
  | 'Family Law'
  | 'Criminal & Bail'
  | 'Personal Injury & Claims'
  | 'Commercial & Contracts'
  | 'Financial & Debt';

export interface LegalService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ServiceCategory;
  iconName: string;
  estimatedDurationMin: number;
  baseFee: string;
  isUrgentCapable: boolean;
  requiredDocuments: string[];
  keyDeliverables: string[];
  processSteps: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  qualifications: string;
  admissions: string[];
  bio: string;
  whatTheyDo: string[];
  specializations: string[];
  experienceYears: number;
  phone: string;
  email: string;
  imageUrl: string;
  quote: string;
}

export interface ProfessionalCertification {
  id: string;
  regulatoryBody: string;
  title: string;
  issuingAuthority: string;
  certificateNumber: string;
  year: number;
  description: string;
  status: string;
  badge: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  relevantServiceSlug?: string;
}

export interface ConsultationBooking {
  id?: string;
  referenceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceTitle: string;
  consultationType: 'in_person' | 'virtual_zoom' | 'phone_call' | 'urgent_police_station_callout';
  urgency: 'standard' | 'urgent' | 'emergency_arrest';
  preferredDate: string;
  preferredTime: string;
  caseSummary: string;
  createdAt: string;
}

export interface FirmLocation {
  firmName: string;
  slogan: string;
  director: string;
  directorQualifications: string;
  streetAddress: string;
  suburbCity: string;
  postalCode: string;
  province: string;
  country: string;
  landlinePhone: string;
  mobileWhatsApp: string;
  email: string;
  website: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    emergencyBail: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

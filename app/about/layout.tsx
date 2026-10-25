import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Law Chambers | 162 Marshall Street, Polokwane',
  description:
    'Discover Ntebaleng Thobakgale Attorneys, headquartered at 162 Marshall Street, Polokwane. Defending your rights with dignity, integrity, and superior court advocacy.',
  keywords: [
    'about Ntebaleng Thobakgale Attorneys',
    '162 Marshall Street Polokwane',
    'law firm in Polokwane',
    'Polokwane law chambers',
    'attorneys 162 Marshall St',
    'Limpopo legal practice history',
    'black owned law firm Polokwane',
    'Fidelity Fund certified attorneys Limpopo',
    'Legal Practice Council registered law firm',
    'high court litigation chambers Polokwane',
    'Defending Your Rights with Dignity',
    'attorneys contact Polokwane',
  ],
  openGraph: {
    title: 'About Our Law Chambers | 162 Marshall Street, Polokwane',
    description:
      'Learn about Ntebaleng Thobakgale Attorneys, our leadership, chambers at 162 Marshall St, Polokwane, and steadfast dedication to client dignity.',
    url: 'https://ntattorneys.co.za/about',
    siteName: 'Ntebaleng Thobakgale Attorneys',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Our Chambers | Ntebaleng Thobakgale Attorneys Polokwane',
    description:
      'Headquartered at 162 Marshall Street, Polokwane. Attorneys, Conveyancers & Notaries defending your rights with dignity.',
  },
  alternates: {
    canonical: '/about',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Ntebaleng Thobakgale Attorneys',
  image: 'https://ntattorneys.co.za/assets/aistudio/home_img_16f7397a.png',
  url: 'https://ntattorneys.co.za/about',
  telephone: '+27158883356',
  email: 'info@ntattorneys.co.za',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '162 Marshall Street',
    addressLocality: 'Polokwane',
    addressRegion: 'Limpopo',
    postalCode: '0700',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -23.9044,
    longitude: 29.4689,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      description: 'Emergency Bail & Urgent Court Matters 24/7 (+27 72 378 6975)',
    },
  ],
  founder: {
    '@type': 'Person',
    name: 'Ntebaleng Thobakgale',
    jobTitle: 'Director · Attorney, Conveyancer & Notary',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

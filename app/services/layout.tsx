import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Services in Polokwane | Ntebaleng Thobakgale Attorneys',
  description:
    'Explore 18 accredited legal services in Polokwane. Expert conveyancing, deceased estates, 24/7 urgent bail, RAF claims, and High Court litigation in Limpopo.',
  keywords: [
    'attorneys in Polokwane',
    'conveyancing attorneys Polokwane',
    'property transfer lawyers Limpopo',
    'deceased estate administration Polokwane',
    '24/7 bail application Polokwane',
    'after hours bail lawyer Limpopo',
    'antenuptial contract notary Polokwane',
    'Road Accident Fund claims Polokwane',
    'RAF lawyers Limpopo',
    'civil litigation attorneys',
    'commercial litigation Polokwane',
    'unlawful arrest claims Minister of Police',
    'debt review removal Section 71',
    'divorce and maintenance attorneys',
    'legal cost consultant Polokwane',
    'drafting contracts and wills Limpopo',
    '162 Marshall Street legal services',
  ],
  openGraph: {
    title: 'Legal Services in Polokwane | Ntebaleng Thobakgale Attorneys',
    description:
      'Explore 18 accredited legal services in Polokwane. Expert conveyancing, deceased estates, 24/7 urgent bail, RAF claims, and High Court litigation.',
    url: 'https://ntattorneys.co.za/services',
    siteName: 'Ntebaleng Thobakgale Attorneys',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Services in Polokwane | Ntebaleng Thobakgale Attorneys',
    description:
      'Accredited conveyancing, deceased estates, 24/7 bail, and litigation in Polokwane, Limpopo.',
  },
  alternates: {
    canonical: '/services',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Ntebaleng Thobakgale Attorneys - Legal Services',
  description:
    'Comprehensive legal services in Polokwane covering conveyancing, litigation, deceased estates, 24/7 bail applications, and notarial contracts.',
  url: 'https://ntattorneys.co.za/services',
  telephone: '+27158883356',
  priceRange: 'ZAR Tariff / Quotation',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '162 Marshall Street',
    addressLocality: 'Polokwane',
    addressRegion: 'Limpopo',
    postalCode: '0700',
    addressCountry: 'ZA',
  },
  areaServed: ['Polokwane', 'Seshego', 'Mankweng', 'Limpopo', 'South Africa'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Legal Practice Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Registration of Properties (Conveyancing)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Administration of Deceased Properties & Estates' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '24/7 Urgent Bail Applications' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Road Accident Fund (RAF) Claims' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Antenuptial Contracts (ANC)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Litigation & Dispute Resolution' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Civil Litigation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medical Negligence Claims' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Debt Review Removal (Section 71 NCA)' } },
    ],
  },
};

export default function ServicesLayout({
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

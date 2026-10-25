import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Legal Team & Practitioners | Ntebaleng Thobakgale Attorneys',
  description:
    'Meet Director Ntebaleng Thobakgale and our accredited legal team in Polokwane. Admitted Attorneys, Conveyancers, Notaries, and Litigation Specialists in Limpopo.',
  keywords: [
    'Ntebaleng Thobakgale',
    'Ntebaleng Thobakgale director',
    'attorneys in Polokwane',
    'lawyers in Polokwane',
    'conveyancer Polokwane',
    'notary public Limpopo',
    'criminal defense attorney Polokwane',
    'civil litigation lawyer',
    'legal cost consultant Polokwane',
    'RAF claims specialist Limpopo',
    'Legal Practice Council attorney Limpopo',
    'High Court right of appearance attorney',
    'black lawyers association Polokwane',
    'law firm team Polokwane',
  ],
  openGraph: {
    title: 'Our Legal Team & Practitioners | Ntebaleng Thobakgale Attorneys',
    description:
      'Meet Director Ntebaleng Thobakgale and our accredited legal practitioners in Polokwane, Limpopo. Defending your rights with dignity.',
    url: 'https://ntattorneys.co.za/team',
    siteName: 'Ntebaleng Thobakgale Attorneys',
    locale: 'en_ZA',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Legal Team | Ntebaleng Thobakgale Attorneys Polokwane',
    description:
      'Meet Director Ntebaleng Thobakgale and senior legal practitioners at 162 Marshall Street, Polokwane.',
  },
  alternates: {
    canonical: '/team',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Ntebaleng Thobakgale Attorneys - Legal Team',
  description:
    'Experienced legal practitioners in Polokwane specializing in property conveyancing, litigation, deceased estates, and urgent bail.',
  url: 'https://ntattorneys.co.za/team',
  telephone: '+27158883356',
  employee: [
    {
      '@type': 'Person',
      name: 'Ntebaleng Thobakgale',
      jobTitle: 'Managing Director & Lead Attorney',
      alumniOf: 'University of Limpopo',
      hasCredential: [
        'Admitted Attorney of the High Court of South Africa',
        'Admitted Conveyancer',
        'Admitted Notary Public',
      ],
    },
    {
      '@type': 'Person',
      name: 'Kgomotso Malatji',
      jobTitle: 'Senior Associate & Head of Litigation',
      alumniOf: 'University of Limpopo',
    },
    {
      '@type': 'Person',
      name: 'Tumelo Phasha',
      jobTitle: 'Associate - Criminal Defense & 24/7 Bail',
      alumniOf: 'University of Venda',
    },
  ],
};

export default function TeamLayout({
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

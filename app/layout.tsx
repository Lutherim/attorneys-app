import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Ntebaleng Thobakgale Attorneys | Polokwane Law Practice',
  description:
    'Premier South African legal practice specializing in conveyancing, litigation, deceased estates, notarial practice, RAF claims, and criminal defense in Polokwane.',
  keywords: [
    'attorneys in Polokwane',
    'conveyancers in Polokwane',
    'notary public Limpopo',
    'Ntebaleng Thobakgale',
    'law firm in Polokwane',
    '162 Marshall Street',
    'deceased estates lawyer',
    '24/7 bail application Polokwane',
    'Road Accident Fund claims',
    'civil litigation attorneys',
  ],
  openGraph: {
    title: 'Ntebaleng Thobakgale Attorneys | Polokwane Law Practice',
    description:
      'Defending Your Rights with Dignity. Admitted Attorney, Conveyancer & Notaries at 162 Marshall Street, Polokwane.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ntebaleng Thobakgale Attorneys | Polokwane',
    description:
      'Defending Your Rights with Dignity. Admitted Attorney, Conveyancer & Notaries.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

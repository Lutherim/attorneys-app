'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Scale,
  Building,
} from 'lucide-react';
import Logo from './Logo';
import { FIRM_DETAILS, LEGAL_SERVICES } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-[#0C0D0F] text-slate-400 font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Main 12-Column Responsive Grid with generous spacing and strict overflow protection */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Col 1: Law Firm Identity - Dedicated 4 columns for clean containment */}
          <div className="lg:col-span-4 min-w-0 max-w-full space-y-4 break-words overflow-hidden">
            <div className="max-w-full overflow-hidden">
              <Logo variant="light" size="sm" showSlogan={false} />
            </div>
            <p className="text-xs leading-relaxed text-slate-400 break-words max-w-sm">
              A distinguished South African law practice specializing in conveyancing, High Court litigation, deceased estate administration, and constitutional defense.
            </p>
            <p className="text-xs font-serif italic text-[#DFBE7A] break-words">
              &ldquo;{FIRM_DETAILS.slogan}&rdquo;
            </p>

            {/* Contained Principal & Director credential badge */}
            <div className="rounded-xl bg-[#141518] border border-slate-800/90 p-3 text-xs text-slate-400 min-w-0 max-w-full overflow-hidden">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                Firm Principal &amp; Director
              </div>
              <div className="text-sm font-serif font-bold text-white break-words">
                Ntebaleng Thobakgale
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 break-words">
                LLB (UL) &middot; Admitted Attorney, Conveyancer &amp; Notary
              </div>
            </div>
          </div>

          {/* Col 2: Core Practice Areas - 3 columns */}
          <div className="lg:col-span-3 min-w-0 space-y-3 break-words overflow-hidden">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-white">
              Specialized Services
            </h4>
            <ul className="space-y-2 text-xs">
              {LEGAL_SERVICES.slice(0, 6).map((srv) => (
                <li key={srv.id} className="min-w-0 break-words">
                  <Link
                    href="/services"
                    className="hover:text-[#DFBE7A] transition-colors block break-words"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/services"
                  className="text-[#DFBE7A] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>+ 12 More Practice Areas &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Practice Info - 2 columns */}
          <div className="lg:col-span-2 min-w-0 space-y-3 break-words overflow-hidden">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-white">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors block">
                  About Our Chambers (162 Marshall St)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors block">
                  Services & Bookings (All 18 Areas)
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors block">
                  Legal Team & Certifications
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors block">
                  Questions & Answers (Legal FAQ)
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors block">
                  Contact & Google Maps
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Chambers Location & Emergency - 3 columns */}
          <div className="lg:col-span-3 min-w-0 space-y-3.5 text-xs break-words overflow-hidden">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-white">
              Polokwane Chambers
            </h4>
            <div className="flex items-start gap-2.5 min-w-0">
              <MapPin className="h-4 w-4 shrink-0 text-[#C5A059] mt-0.5" />
              <span className="break-words leading-relaxed">
                {FIRM_DETAILS.streetAddress}, {FIRM_DETAILS.suburbCity}, 0700, Limpopo
              </span>
            </div>
            <div className="flex items-center gap-2.5 min-w-0">
              <Phone className="h-4 w-4 shrink-0 text-[#C5A059]" />
              <a href="tel:0158883356" className="hover:text-white font-medium">
                {FIRM_DETAILS.landlinePhone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 min-w-0">
              <Mail className="h-4 w-4 shrink-0 text-[#C5A059]" />
              <a
                href={`mailto:${FIRM_DETAILS.email}`}
                className="hover:text-white font-medium break-all"
              >
                {FIRM_DETAILS.email}
              </a>
            </div>
            <div className="rounded-xl bg-[#141518] border border-amber-500/30 p-3 text-[11px] text-amber-300 min-w-0 break-words mt-2">
              <span className="font-semibold block">24/7 Urgent Bail Response:</span>
              <a
                href={`tel:${FIRM_DETAILS.mobileWhatsApp.replace(/\s+/g, '')}`}
                className="underline font-mono block mt-0.5 break-all"
              >
                {FIRM_DETAILS.mobileWhatsApp}
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright with generous margins and strict containment */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-800/80 text-[11px] text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4 min-w-0 overflow-hidden">
          <p className="break-words min-w-0 max-w-xl leading-relaxed">
            &copy; {currentYear} {FIRM_DETAILS.firmName}. All rights reserved. Registered with the Legal Practice Council (LPC) South Africa.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 shrink-0">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Fidelity Fund Covered</span>
            </span>
            <span>·</span>
            <span>Attorney-Client Privilege</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

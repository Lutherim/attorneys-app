'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Scale,
  Building,
  HeartHandshake,
} from 'lucide-react';
import Logo from './Logo';
import { FIRM_DETAILS, LEGAL_SERVICES } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-[#0C0D0F] text-slate-400 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Law Firm Identity */}
          <div className="space-y-4">
            <Logo variant="light" showSlogan={false} />
            <p className="text-xs leading-relaxed text-slate-400">
              A distinguished South African law practice specializing in conveyancing, High Court litigation, deceased estate administration, and constitutional defense.
            </p>
            <p className="text-xs font-serif italic text-[#DFBE7A]">
              &ldquo;{FIRM_DETAILS.slogan}&rdquo;
            </p>
            <div className="text-[11px] text-slate-500">
              Director: <strong className="text-slate-300">Ntebaleng Thobakgale</strong> | LLB (UL)
            </div>
          </div>

          {/* Col 2: Core Practice Areas */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-white mb-3">
              Specialized Services
            </h4>
            <ul className="space-y-1.5 text-xs">
              {LEGAL_SERVICES.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <Link
                    href="/services"
                    className="hover:text-[#DFBE7A] transition-colors"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-[#DFBE7A] font-semibold hover:underline">
                  + 12 More Practice Areas &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Practice Info */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-white mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Chambers (162 Marshall St)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services & Bookings (All 18 Areas)
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Legal Team & Certifications
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Questions & Answers (Legal FAQ)
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact & Google Maps
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Chambers Location & Emergency */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-white mb-3">
              Polokwane Chambers
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#C5A059] mt-0.5" />
              <span>{FIRM_DETAILS.streetAddress}, {FIRM_DETAILS.suburbCity}, 0700, Limpopo</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[#C5A059]" />
              <a href="tel:0158883356" className="hover:text-white font-medium">
                {FIRM_DETAILS.landlinePhone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[#C5A059]" />
              <a href={`mailto:${FIRM_DETAILS.email}`} className="hover:text-white font-medium">
                {FIRM_DETAILS.email}
              </a>
            </div>
            <div className="rounded-lg bg-[#141518] border border-amber-500/30 p-2.5 text-[11px] text-amber-300">
              <span className="font-semibold block">24/7 Urgent Bail Response:</span>
              <a href={`tel:${FIRM_DETAILS.mobileWhatsApp.replace(/\s+/g, '')}`} className="underline font-mono">
                {FIRM_DETAILS.mobileWhatsApp}
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {currentYear} {FIRM_DETAILS.firmName}. All rights reserved. Registered with the Legal Practice Council (LPC) South Africa.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C5A059]" />
              Fidelity Fund Covered
            </span>
            <span>·</span>
            <span>Attorney-Client Privilege</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

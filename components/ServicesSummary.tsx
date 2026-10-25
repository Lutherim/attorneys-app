'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Home,
  Scroll,
  HeartHandshake,
  Briefcase,
  Siren,
  Car,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { LEGAL_SERVICES } from '@/lib/data';
import { LegalService } from '@/types/legal';
import ServiceDetailModal from './ServiceDetailModal';

// 6 Core Featured Practice Areas representing the firm's primary caseload
const FEATURED_SLUGS = [
  'registration-of-properties',
  'administration-of-deceased-properties',
  'bail-application',
  'commercial-litigation',
  'registration-of-antenuptial-contract',
  'road-accident-fund-claims',
];

const ICON_MAP: Record<string, React.ElementType> = {
  'registration-of-properties': Home,
  'administration-of-deceased-properties': Scroll,
  'bail-application': Siren,
  'commercial-litigation': Briefcase,
  'registration-of-antenuptial-contract': HeartHandshake,
  'road-accident-fund-claims': Car,
};

export default function ServicesSummary() {
  const [selectedService, setSelectedService] = useState<LegalService | null>(null);

  const featuredServices = LEGAL_SERVICES.filter((srv) =>
    FEATURED_SLUGS.includes(srv.slug)
  );

  return (
    <section id="services" className="relative bg-[#1A1C20] py-16 sm:py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Matching Wireframe "SERVICE OFFERED" */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DFBE7A]">
              Practice Areas Summary
            </span>
            <h2 className="mt-1 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              SERVICE OFFERED
            </h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-300">
              Admitted Attorney, Conveyancer & Notarial services in Polokwane. Overview of our most requested legal solutions.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-5 py-2.5 text-xs font-bold text-black shadow-md hover:bg-[#B38F46] transition-all self-start sm:self-auto"
          >
            <span>View All 18 Practice Areas</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 6 Curated Small Box Cards (Wireframe Style) */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, idx) => {
            const IconComponent = ICON_MAP[service.slug] || Home;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#141518] p-6 shadow-xl transition-all hover:border-[#C5A059] hover:shadow-[#C5A059]/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#C5A059] group-hover:text-black">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {service.isUrgentCapable && (
                      <span className="rounded-full bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                        24/7 Urgent
                      </span>
                    )}
                  </div>

                  <span className="mt-4 block text-[11px] font-bold uppercase tracking-wider text-[#DFBE7A]">
                    {service.category}
                  </span>

                  <h3 className="mt-1 font-serif text-lg font-bold text-white group-hover:text-[#DFBE7A] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-xs text-slate-300 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {service.estimatedDurationMin}m Consultation
                  </span>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#C5A059] hover:text-black"
                  >
                    <span>Book / Info</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner Linking to Dedicated Services Page */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-[#121316] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-0.5">
            <h4 className="font-serif text-sm sm:text-base font-bold text-white">
              Need Assistance with Other Legal Matters?
            </h4>
            <p className="text-xs text-slate-400">
              We also handle Civil Litigation, Medical Negligence, Debt Collection, Debt Review Removal, Contract Drafting, Wills, Trusts, and Commercial Crimes.
            </p>
          </div>

          <Link
            href="/services"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border border-[#C5A059] px-5 py-2.5 text-xs font-bold text-[#DFBE7A] hover:bg-[#C5A059] hover:text-black transition-colors"
          >
            <span>Explore All 18 Practice Areas & FAQ &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Individual Service Detail & Booking Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}

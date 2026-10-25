'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Home,
  Scroll,
  HeartHandshake,
  Briefcase,
  Coins,
  Scale,
  ShieldAlert,
  Stethoscope,
  Car,
  AlertOctagon,
  Calculator,
  FileLock2,
  Siren,
  CreditCard,
  Users2,
  FileSignature,
  FileText,
  Building2,
  Calendar,
  ArrowRight,
  Search,
  CheckCircle,
} from 'lucide-react';
import { LEGAL_SERVICES } from '@/lib/data';
import { LegalService } from '@/types/legal';
import ServiceDetailModal from './ServiceDetailModal';
import QnAPage from './QnAPage';

// Icon map linking string names to Lucide icon components
const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Scroll,
  HeartHandshake,
  Briefcase,
  Coins,
  Scale,
  ShieldAlert,
  Stethoscope,
  Car,
  AlertOctagon,
  Calculator,
  FileLock2,
  Siren,
  CreditCard,
  Users2,
  FileSignature,
  FileText,
  Building2,
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<LegalService | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Property & Conveyancing',
    'Estates & Trusts',
    'Litigation & Dispute Resolution',
    'Family Law',
    'Criminal & Bail',
    'Personal Injury & Claims',
    'Financial & Debt',
  ];

  const filteredServices = LEGAL_SERVICES.filter((srv) => {
    const matchesCategory = activeCategory === 'All' || srv.category === activeCategory;
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="relative bg-[#1A1C20] py-16 sm:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Wireframe "SERVICE OFFERED" */}
        <div className="text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DFBE7A]">
            02 · Specialized Practice Areas
          </span>
          <h2 className="mt-1 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            SERVICE OFFERED
          </h2>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-300">
            Admitted Attorney, Conveyancer & Notarial services in Polokwane. Click any service card to view complete legal procedure and book a consultation directly.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#121316] border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#C5A059] text-black font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g., bail, RAF, deed)..."
              className="w-full rounded-xl border border-slate-700 bg-[#121316] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-[#C5A059] focus:outline-none"
            />
          </div>
        </div>

        {/* Service Cards Grid (Matching Wireframe small icon boxes) */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Scale;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-700/80 bg-[#141518] p-5 shadow-lg transition-all hover:border-[#C5A059] hover:shadow-[#C5A059]/10"
              >
                <div>
                  {/* Top Bar with Lucide Icon and Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-black">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    {service.isUrgentCapable && (
                      <span className="rounded-full bg-amber-950/80 border border-amber-600/40 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                        24/7 Urgent
                      </span>
                    )}
                  </div>

                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-wider text-[#DFBE7A]">
                    {service.category}
                  </span>

                  <h3 className="mt-1 font-serif text-base font-bold text-white group-hover:text-[#DFBE7A] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-xs text-slate-300 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Bottom Action Area: Small Box Booking Trigger */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-slate-400">
                    {service.estimatedDurationMin}m consult
                  </span>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#C5A059] hover:text-black"
                    aria-label={`Book or view details for ${service.title}`}
                  >
                    <span>Book / Info</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Notice of All 18 Official Services */}
        <div className="mt-10 rounded-xl border border-slate-800 bg-[#121316] p-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div className="text-xs text-slate-300">
            <strong>All 18 Practice Areas Authenticated</strong> from the official sign & business card of Ntebaleng Thobakgale Attorneys (162 Marshall St, Polokwane).
          </div>
          <a
            href="tel:0158883356"
            className="mt-2 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#DFBE7A] hover:underline"
          >
            <span>Direct Line: 015 888 3356</span>
          </a>
        </div>

        {/* INCLUDED Q&A INSIDE SERVICES AS REQUESTED */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <QnAPage onSelectService={(slug) => {
            const found = LEGAL_SERVICES.find(s => s.slug === slug);
            if (found) setSelectedService(found);
          }} />
        </div>
      </div>

      {/* Dedicated Separate Page / Modal for the clicked service with full booking */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}

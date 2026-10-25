'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Scale,
  ShieldCheck,
  Award,
  Phone,
  MessageCircle,
  Calendar,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';
import ConsultationBookingModal from '@/components/ConsultationBookingModal';
import WhatsAppFloatingWidget from '@/components/WhatsAppFloatingWidget';
import PageLoader from '@/components/PageLoader';
import { FIRM_DETAILS } from '@/lib/data';

export default function ServicesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-900 selection:bg-[#C5A059] selection:text-black dark:bg-[#0E0F12] dark:text-slate-100 flex flex-col font-sans">
      <PageLoader />

      {/* Navigation */}
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      <main className="flex-1">
        {/* Dedicated Services Page Hero Header */}
        <section className="relative overflow-hidden bg-[#141518] py-16 sm:py-24 text-white">
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#C5A059]/30 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#C5A059]/20 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold text-[#DFBE7A] uppercase tracking-widest">
                <Scale className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>All 18 Registered Practice Areas · Polokwane Chambers</span>
              </span>

              <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                Our Legal <span className="text-[#C5A059] italic">Services.</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                As admitted Attorneys, Conveyancers, and Notaries Public, we provide full-spectrum legal solutions across Limpopo and superior courts throughout South Africa. Select any service below to view required documents, timelines, and book an immediate consultation.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
                  <span>Legal Practice Council Accredited</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-[#C5A059]" />
                  <span>Fidelity Fund Certificate Protected</span>
                </span>
                <span>·</span>
                <a
                  href={`tel:${FIRM_DETAILS.mobileWhatsApp.replace(/\s+/g, '')}`}
                  className="text-amber-300 font-semibold hover:underline"
                >
                  24/7 Urgent Bail Hotline: {FIRM_DETAILS.mobileWhatsApp}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Full 18-Service Catalog with Category Filters, Search, Modal Booking, and Q&A */}
        <ServicesSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Booking Modal */}
      <ConsultationBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* WhatsApp Floating Widget */}
      <WhatsAppFloatingWidget />
    </div>
  );
}

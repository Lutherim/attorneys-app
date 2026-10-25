'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Scale,
  ArrowRight,
  Building2,
  Users,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import ServicesSummary from '@/components/ServicesSummary';
import ContactAndMaps from '@/components/ContactAndMaps';
import Footer from '@/components/Footer';
import ConsultationBookingModal from '@/components/ConsultationBookingModal';
import WhatsAppFloatingWidget from '@/components/WhatsAppFloatingWidget';
import PageLoader from '@/components/PageLoader';
import { loadFirmPortalDataParallel, FirmDashboardData } from '@/lib/business-logic';

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingServiceSlug, setBookingServiceSlug] = useState<string | undefined>(undefined);
  const [bookingAttorneyName, setBookingAttorneyName] = useState<string | undefined>(undefined);
  const [, setDashboardData] = useState<FirmDashboardData | null>(null);

  // Separation of concerns: parallel asynchronous fetching of firm status & schedules
  useEffect(() => {
    let isMounted = true;
    loadFirmPortalDataParallel()
      .then((data) => {
        if (isMounted) setDashboardData(data);
      })
      .catch((err) => {
        console.error('Portal parallel load error:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenBooking = (serviceSlug?: string, attorneyName?: string) => {
    setBookingServiceSlug(serviceSlug);
    setBookingAttorneyName(attorneyName);
    setBookingModalOpen(true);
  };

  // Standard framer-motion reveal animation variant for scrolling down
  const sectionReveal = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, ease: 'easeOut' as const },
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-900 selection:bg-[#C5A059] selection:text-black dark:bg-[#0E0F12] dark:text-slate-100 flex flex-col font-sans">
      {/* Page Loader with Branded Emblem and Smooth Exit */}
      <PageLoader />

      {/* 1. Header with spacious desktop navigation (Home, About Us, Services, Team) and mobile-only burger menu */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        {/* 2. Hero Section: Slogan, "Book Now" CTA on left, "Opening Hours" on right (Wireframe compliant) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroBanner onOpenBooking={() => handleOpenBooking()} />
        </motion.div>

        {/* 3. Editorial Bridges: Explore About Chambers and Dedicated Team */}
        <motion.section
          {...sectionReveal}
          className="border-y border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-[#121316]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Card 1: Explore About Us Chambers at 162 Marshall St */}
              <Link
                href="/about"
                className="group relative flex items-center justify-between rounded-2xl border border-slate-200 bg-[#FBF9F5] p-6 shadow-sm transition-all hover:border-[#C5A059] hover:shadow-md dark:border-slate-800 dark:bg-[#16171B]"
              >
                <div className="space-y-1 pr-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A37E36] dark:text-[#DFBE7A]">
                    Practice Chambers & Heritage
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#C5A059] transition-colors dark:text-white">
                    About Our Law Chambers &rarr;
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Tour our private chambers at 162 Marshall Street, Polokwane, and discover our guiding ethos.
                  </p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C5A059]/15 text-[#A37E36] dark:text-[#DFBE7A] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                  <Building2 className="h-5 w-5" />
                </div>
              </Link>

              {/* Card 2: Explore Our Dedicated Legal Team (with image on left, text on right & statutory certifications) */}
              <Link
                href="/team"
                className="group relative flex items-center justify-between rounded-2xl border border-slate-200 bg-[#FBF9F5] p-6 shadow-sm transition-all hover:border-[#C5A059] hover:shadow-md dark:border-slate-800 dark:bg-[#16171B]"
              >
                <div className="space-y-1 pr-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A37E36] dark:text-[#DFBE7A]">
                    Practitioners, Specialists & Certifications
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#C5A059] transition-colors dark:text-white">
                    Meet Our Legal Team &rarr;
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Detailed profiles of Director Ntebaleng Thobakgale, senior associates, and official LPC & High Court certifications.
                  </p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C5A059]/15 text-[#A37E36] dark:text-[#DFBE7A] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                  <Users className="h-5 w-5" />
                </div>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* 4. Services Summary: Wireframe 6-card summary with link to dedicated /services page */}
        <motion.div {...sectionReveal}>
          <ServicesSummary />
        </motion.div>

        {/* 5. Contact Us & Google Maps: Bottom section matching wireframe icons (Contact us, Google Maps, Forms) */}
        <motion.div {...sectionReveal}>
          <ContactAndMaps />
        </motion.div>
      </main>

      {/* 6. Law Firm Footer */}
      <Footer />

      {/* 7. Global Consultation Booking Modal */}
      <ConsultationBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialServiceSlug={bookingServiceSlug}
        initialAttorneyName={bookingAttorneyName}
      />

      {/* 8. Floating WhatsApp Conversion Widget with 24/7 direct access */}
      <WhatsAppFloatingWidget />
    </div>
  );
}

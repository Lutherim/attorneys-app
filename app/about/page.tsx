'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Scale,
  Award,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Building2,
  Clock,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  BookOpen,
  Briefcase,
  Quote,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConsultationBookingModal from '@/components/ConsultationBookingModal';
import WhatsAppFloatingWidget from '@/components/WhatsAppFloatingWidget';
import PageLoader from '@/components/PageLoader';
import { FIRM_DETAILS } from '@/lib/data';

export default function AboutPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const pillars = [
    {
      title: 'Uncompromised Integrity',
      desc: 'Every matter is approached with radical honesty, statutory adherence under the Legal Practice Act, and transparent accounting.',
    },
    {
      title: 'Relentless Advocacy',
      desc: 'Whether in the High Court of South Africa or late-night police station bail hearings, we fight passionately for client liberty and justice.',
    },
    {
      title: 'Client Dignity First',
      desc: 'Our founding motto, "Defending Your Rights with Dignity," informs every client interaction, property transfer, and court pleading.',
    },
    {
      title: 'Regional Grounding, National Reach',
      desc: 'Anchored at 162 Marshall Street, Polokwane, representing individuals, corporations, and families across Limpopo and nationwide.',
    },
  ];

  const milestones = [
    {
      year: 'Established in Polokwane',
      heading: 'Founding of Ntebaleng Thobakgale Attorneys',
      text: 'Admitted Attorney, Conveyancer and Notary Public Ntebaleng Thobakgale established the practice to deliver high-calibre corporate, property, and civil legal solutions with personal dedication.',
    },
    {
      year: 'Statutory Expansion',
      heading: 'Conveyancing & Notarial Department',
      text: 'Acquiring full Deeds Registries Act accreditation, the firm streamlined residential and commercial property transfers, bond cancellations, and Antenuptial contract executions in Limpopo.',
    },
    {
      year: 'Superior Courts Audience',
      heading: 'Section 25(2) Superior Court Appearance',
      text: 'Securing direct Right of Appearance in the High Court of South Africa, Supreme Court of Appeal, and Constitutional Court, expanding trial advocacy capacity.',
    },
    {
      year: '24/7 Justice Response',
      heading: 'Emergency Bail & Unlawful Arrest Practice',
      text: 'Instituting our rapid after-hours bail dispatch unit covering Polokwane Central SAPS, Seshego, and Mankweng holding cells, alongside substantial civil claims against the Minister of Police.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-900 selection:bg-[#C5A059] selection:text-black dark:bg-[#0E0F12] dark:text-slate-100 flex flex-col font-sans">
      <PageLoader />
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Banner for About Us */}
        <section className="relative overflow-hidden bg-[#141518] py-16 sm:py-24 text-white">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image
              src="/assets/aistudio/home_img_16f7397a.png"
              alt="162 Marshall Street Background"
              fill
              className="object-cover filter grayscale"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-[#141518]/80 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold text-[#DFBE7A] uppercase tracking-widest">
                <Scale className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>Our Heritage & Practice Chambers</span>
              </span>

              <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                About Ntebaleng Thobakgale{' '}
                <span className="text-[#C5A059] italic">Attorneys.</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Operating from our private chambers at <strong>162 Marshall Street, Polokwane</strong>, we combine legal scholarship, high-stakes courtroom tenacity, and genuine empathy to deliver results that protect lives, families, and commercial legacies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Physical Chambers & Modified Business Image Feature */}
        <section className="py-16 sm:py-20 bg-white dark:bg-[#121316]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 lg:gap-16">
              {/* Left Column: Modified Business Image & Official Signboard */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-6 space-y-4"
              >
                {/* Physical House Image at 162 Marshall Street */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-[#C5A059]/40 bg-white shadow-xl dark:border-[#C5A059]/30 dark:bg-slate-900">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <Image
                      src="/assets/aistudio/home_img_16f7397a.png"
                      alt="Ntebaleng Thobakgale Attorneys Office Chambers at 162 Marshall Street, Polokwane"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="rounded bg-[#C5A059] px-2 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
                        Practice Chambers
                      </span>
                      <h3 className="mt-1 font-serif text-lg sm:text-xl font-bold">
                        162 Marshall Street, Polokwane 0700
                      </h3>
                      <p className="text-xs text-[#DFBE7A] flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Central Polokwane · Limpopo, South Africa</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-row: Official Signboard & Business Card Asset Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[#FBF9F5] p-3 shadow-sm dark:border-slate-800 dark:bg-[#1A1C20]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <Image
                        src="/assets/aistudio/details_personal_ab42654f.jpg"
                        alt="Official Firm Signboard"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-[11px] font-bold text-center text-slate-800 dark:text-slate-200">
                      Official Firm Signboard
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[#FBF9F5] p-3 shadow-sm dark:border-slate-800 dark:bg-[#1A1C20]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <Image
                        src="/assets/aistudio/services_00a3c587.jpg"
                        alt="Practice Services Credentials Card"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-[11px] font-bold text-center text-slate-800 dark:text-slate-200">
                      18 Registered Practice Areas
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Full Text About the Business */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-6 space-y-5"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-[#A37E36] dark:text-[#DFBE7A]">
                  Firm Leadership & Vision
                </span>

                <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Founded with a Sacred Mandate: To Defend Every Client&apos;s Rights With Dignity.
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  <strong>Ntebaleng Thobakgale Attorneys</strong> was founded by Director <strong>Ntebaleng Thobakgale</strong>, an admitted Attorney of the High Court of South Africa, specialist Conveyancer, and Notary Public. Holding an LLB from the University of Limpopo, she has devoted her legal career to breaking down barriers to robust legal protection.
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  Our practice was built on the conviction that legal representation must combine unyielding statutory precision with deep respect for the human beings we represent. Whether assisting a first-time homebuyer with property registration at the Deeds Office, pursuing multi-million rand medical negligence and RAF damages, or racing to a holding cell in the dead of night to secure bail, we stand firmly in our clients&apos; corner.
                </p>

                {/* Director Quote Box */}
                <div className="rounded-2xl border-l-4 border-[#C5A059] bg-[#FBF9F5] p-5 shadow-sm dark:bg-[#1A1C20] dark:border-[#C5A059]">
                  <Quote className="h-6 w-6 text-[#C5A059] opacity-60 mb-1" />
                  <p className="font-serif italic text-sm text-slate-800 dark:text-slate-200">
                    &ldquo;In our chambers, no client is merely a file number. We view every brief as a solemn trust—a mandate to protect what you have built and restore your peace of mind.&rdquo;
                  </p>
                  <p className="mt-2 text-xs font-bold text-[#A37E36] dark:text-[#DFBE7A]">
                    — Ntebaleng Thobakgale | Director, LLB (UL)
                  </p>
                </div>

                {/* Call to Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-6 py-3 text-xs font-bold text-black shadow-md hover:bg-[#B38F46] transition-all"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book Consultation with Director</span>
                  </button>

                  <Link
                    href="/team"
                    className="w-full sm:w-auto flex items-center justify-center gap-1 text-xs font-bold text-slate-800 hover:text-[#C5A059] dark:text-slate-200 transition-colors py-2"
                  >
                    <span>View Our Legal Team</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Practice Pillars */}
        <section className="py-16 sm:py-20 bg-[#FBF9F5] dark:bg-[#0E0F12]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A37E36] dark:text-[#DFBE7A]">
                The Principles Guiding Our Practice
              </span>
              <h2 className="mt-1 font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Our Core Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#16171B]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5A059]/15 text-[#A37E36] dark:text-[#DFBE7A] font-serif font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="mt-4 font-serif text-base font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practice History Milestones */}
        <section className="py-16 sm:py-20 bg-white dark:bg-[#121316]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A37E36] dark:text-[#DFBE7A]">
                Practice Track Record
              </span>
              <h2 className="mt-1 font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Key Milestones of Excellence
              </h2>
            </div>

            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-slate-200 p-6 bg-[#FBF9F5] dark:border-slate-800 dark:bg-[#16171B]"
                >
                  <div className="shrink-0 rounded-xl bg-[#C5A059] px-3 py-1.5 text-xs font-bold text-black sm:w-44 text-center">
                    {m.year}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                      {m.heading}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ConsultationBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <WhatsAppFloatingWidget />
    </div>
  );
}

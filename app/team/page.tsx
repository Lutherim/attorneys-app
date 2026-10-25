'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Scale,
  Award,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Briefcase,
  GraduationCap,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CertificationsSection from '@/components/CertificationsSection';
import ConsultationBookingModal from '@/components/ConsultationBookingModal';
import WhatsAppFloatingWidget from '@/components/WhatsAppFloatingWidget';
import PageLoader from '@/components/PageLoader';
import { TEAM_MEMBERS, FIRM_DETAILS } from '@/lib/data';

export default function TeamPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAttorney, setSelectedAttorney] = useState<string | undefined>(undefined);

  const handleBookWithAttorney = (name: string) => {
    setSelectedAttorney(name);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-900 selection:bg-[#C5A059] selection:text-black dark:bg-[#0E0F12] dark:text-slate-100 flex flex-col font-sans">
      <PageLoader />
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      <main className="flex-1">
        {/* Page Hero Header */}
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
                <UserCheck className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>Legal Practitioners & Specialists</span>
              </span>

              <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                Our Legal <span className="text-[#C5A059] italic">Team.</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Meet the attorneys, conveyancers, and cost consultants of Ntebaleng Thobakgale Attorneys. Each professional brings deep technical knowledge, courtroom grit, and unbending client loyalty.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Full Team Roster:
            Strict user rule: "on the team let each img about the professional be at left and the text next to it at the right"
            "make sure each person info spends the entire page followed by another person" */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {TEAM_MEMBERS.map((member, index) => (
            <section
              key={member.id}
              id={`team-member-${member.id}`}
              className="relative min-h-[85vh] flex items-center py-16 sm:py-24 bg-white dark:bg-[#121316] even:bg-[#FBF9F5] dark:even:bg-[#0E0F12]"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                {/* 2-Column Grid: Image strictly on LEFT, Text strictly on RIGHT */}
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-16">
                  {/* LEFT SIDE: Image of the professional */}
                  <motion.div
                    initial={{ opacity: 0, x: -35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:col-span-5"
                  >
                    <div className="relative mx-auto max-w-md md:max-w-none">
                      {/* Gold-framed Card with Photo */}
                      <div className="relative overflow-hidden rounded-2xl border-2 border-[#C5A059]/40 bg-white p-2.5 shadow-2xl dark:border-[#C5A059]/30 dark:bg-slate-900">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
                          <Image
                            src={member.imageUrl}
                            alt={`${member.name} - ${member.role}`}
                            fill
                            className="object-cover object-top transition-transform duration-700 hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                          {/* Overlay Name & Role */}
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <span className="rounded bg-[#C5A059] px-2.5 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
                              {member.role}
                            </span>
                            <h3 className="mt-1 font-serif text-xl sm:text-2xl font-bold">
                              {member.name}
                            </h3>
                            <p className="text-xs text-[#DFBE7A] font-medium">
                              {member.title}
                            </p>
                          </div>
                        </div>

                        {/* Quick Direct Communication Bar */}
                        <div className="mt-2.5 flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/80 text-xs">
                          <a
                            href={`tel:${member.phone.replace(/\s+/g, '')}`}
                            className="flex items-center gap-1.5 text-slate-700 hover:text-[#C5A059] dark:text-slate-300 font-semibold transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5 text-[#C5A059]" />
                            <span>{member.phone}</span>
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-1.5 text-slate-700 hover:text-[#C5A059] dark:text-slate-300 transition-colors truncate max-w-[170px]"
                          >
                            <Mail className="h-3.5 w-3.5 text-[#C5A059]" />
                            <span className="truncate">{member.email}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* RIGHT SIDE: Text talking about what they do */}
                  <motion.div
                    initial={{ opacity: 0, x: 35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:col-span-7 space-y-5"
                  >
                    {/* Badge & Experience */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#C5A059]/15 px-3 py-1 text-xs font-bold text-[#A37E36] dark:text-[#DFBE7A]">
                        {member.role}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {member.experienceYears}+ Years Admitted Practice
                      </span>
                    </div>

                    {/* Name & Academic Credentials */}
                    <div>
                      <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {member.name}
                      </h2>
                      <p className="mt-1 text-sm sm:text-base font-semibold text-[#A37E36] dark:text-[#DFBE7A] flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 shrink-0 text-[#C5A059]" />
                        <span>{member.qualifications}</span>
                      </p>
                    </div>

                    {/* Admissions and Superior Court Enrollments */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {member.admissions.map((adm, i) => (
                        <span
                          key={i}
                          className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                        >
                          {adm}
                        </span>
                      ))}
                    </div>

                    {/* Biography */}
                    <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                      {member.bio}
                    </p>

                    {/* DEDICATED SECTION: "What [Name] Does at Ntebaleng Thobakgale Attorneys" */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#15161A]">
                      <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                        <Briefcase className="h-4 w-4 text-[#C5A059]" />
                        <span>What {member.name.split(' ')[0]} Does in Practice:</span>
                      </h3>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {member.whatTheyDo.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 shrink-0 text-[#C5A059] mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specializations Tags */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Core Competencies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.specializations.map((spec, i) => (
                          <span
                            key={i}
                            className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quoted philosophy */}
                    <div className="border-l-2 border-[#C5A059] pl-4 italic text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-serif">
                      &ldquo;{member.quote}&rdquo;
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => handleBookWithAttorney(member.name)}
                        className="flex items-center gap-2 rounded-xl bg-[#C5A059] px-5 py-3 text-xs font-bold text-black shadow-md hover:bg-[#B38F46] transition-all"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Book Consultation with {member.name.split(' ')[0]}</span>
                      </button>

                      <a
                        href={`https://wa.me/27723786975?text=${encodeURIComponent(`Hello, I would like to consult with ${member.name} regarding my legal matter.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>WhatsApp Direct</span>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Professional Certifications of our Legal Team as requested */}
        <CertificationsSection />
      </main>

      <Footer />

      <ConsultationBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialAttorneyName={selectedAttorney}
      />

      <WhatsAppFloatingWidget />
    </div>
  );
}

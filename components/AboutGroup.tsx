'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Scale,
  Award,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Building2,
  Users,
  FileCheck,
  ArrowRight,
} from 'lucide-react';
import { FIRM_DETAILS } from '@/lib/data';

interface AboutGroupProps {
  onOpenBooking: () => void;
}

export default function AboutGroup({ onOpenBooking }: AboutGroupProps) {
  const credentials = [
    'Admitted Attorney of the High Court of South Africa',
    'Specialist Conveyancer enrolled under Deeds Registries Act',
    'Admitted Notary Public for Antenuptial Contracts & Deeds',
    'Member in good standing of the Legal Practice Council (LPC)',
    'Full Right of Appearance in Superior Courts (Section 25(2))',
    'Active Legal Practitioners’ Fidelity Fund Certificate holder',
  ];

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24 bg-[#FBF9F5] dark:bg-[#111215]">
      {/* Background using the house photo as requested: "use the house as a background on the page of about us and where necessary" */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07] dark:opacity-[0.12]">
        <Image
          src="/assets/aistudio/home_img_16f7397a.png"
          alt="162 Marshall Street Law Office Background"
          fill
          className="object-cover object-center filter grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F5] via-transparent to-[#FBF9F5] dark:from-[#111215] dark:via-transparent dark:to-[#111215]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section kicker */}
        <div className="text-center sm:text-left mb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A37E36] dark:text-[#DFBE7A]">
            01 · Practice Overview
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Rooted in Polokwane. Driven by Justice.
          </h2>
        </div>

        {/* Wireframe Layout: Left = Group IMG | Right = TEXT ABOUT THE GROUP */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: "Group IMG" Container matching wireframe */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold border */}
              <div className="overflow-hidden rounded-2xl border-2 border-[#C5A059]/40 bg-white shadow-xl dark:border-[#C5A059]/30 dark:bg-slate-900">
                {/* Image of the physical house / headquarters at 162 Marshall Street */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <Image
                    src="/assets/aistudio/home_img_16f7397a.png"
                    alt="Ntebaleng Thobakgale Attorneys Law Chambers at 162 Marshall Street, Polokwane"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#DFBE7A]">
                      Physical Practice Headquarters
                    </p>
                    <p className="text-sm font-bold flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-4 w-4 text-[#C5A059]" />
                      <span>162 Marshall Street, Polokwane 0700</span>
                    </p>
                  </div>
                </div>

                {/* Sub-card with Director Credentials & Signboard thumbnail */}
                <div className="p-4 sm:p-5 bg-white dark:bg-[#16171B] border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#C5A059] shadow-sm">
                      <Image
                        src="/assets/aistudio/details_personal_ab42654f.jpg"
                        alt="Official Firm Signboard"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white">
                        {FIRM_DETAILS.director}
                      </h4>
                      <p className="text-xs text-[#A37E36] font-medium dark:text-[#DFBE7A]">
                        Director · LLB (UL)
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Attorneys · Conveyancers · Notaries
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: "TEXT ABOUT THE GROUP" Container matching wireframe */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="space-y-4">
              <span className="inline-block rounded-md bg-[#C5A059]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#A37E36] dark:text-[#DFBE7A]">
                About Our Firm
              </span>

              <h3 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Defending Your Rights with Dignity, Precision, and Unyielding Resolve.
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Founded by <strong>Ntebaleng Thobakgale</strong>, our law practice stands at the vanguard of legal excellence in Limpopo and South Africa. Operating from our private chambers at <strong>162 Marshall Street, Polokwane</strong>, we bring formidable legal scholarship, relentless courtroom advocacy, and transparent, client-centered integrity to every brief.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Whether executing multi-million rand property conveyancing at the Deeds Registry, winding up complex deceased estates with the Master of the High Court, providing 24/7 emergency bail interventions, or recovering maximum Road Accident Fund compensation, we defend our clients’ rights with dignity.
              </p>

              {/* Key Credentials Grid */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
                  Key Professional Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  {credentials.map((cred, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Call to Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenBooking}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-slate-800 dark:bg-[#C5A059] dark:text-black dark:hover:bg-[#B38F46]"
                >
                  <span>Book Consultation With Director</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>

                <a
                  href="#services"
                  className="text-xs font-semibold text-[#A37E36] hover:text-[#C5A059] dark:text-[#DFBE7A] transition-colors flex items-center gap-1"
                >
                  <span>Explore All 18 Legal Practice Areas</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

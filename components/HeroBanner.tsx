'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  CalendarDays,
  Clock,
  ShieldCheck,
  Award,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Scale,
  Building,
} from 'lucide-react';
import { FIRM_DETAILS } from '@/lib/data';
import { OfficeScheduleManager } from '@/lib/business-logic';

interface HeroBannerProps {
  onOpenBooking: () => void;
}

export default function HeroBanner({ onOpenBooking }: HeroBannerProps) {
  const [liveSchedule] = useState(() => {
    try {
      const schedule = new OfficeScheduleManager();
      return schedule.getLiveStatus();
    } catch {
      return {
        isOpen: true,
        statusText: 'Office Open Now',
        subText: 'Mon – Fri: 08:00 – 17:00 | Polokwane, Limpopo',
        isEmergencyBailActive: false,
      };
    }
  });

  return (
    <section id="home" className="relative overflow-hidden bg-[#141518] text-white">
      {/* Background Architectural Law Atmosphere with Gold Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#C5A059]/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#C5A059]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Wireframe Slogan Banner */}
        <div className="text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold text-[#DFBE7A] uppercase tracking-widest backdrop-blur-sm"
          >
            <Scale className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Limpopo’s Premier Legal Practice · Established in Polokwane</span>
          </motion.div>

          {/* Bold SLOGAN as per wireframe */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-serif text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance"
          >
            DEFENDING YOUR RIGHTS{' '}
            <span className="text-[#C5A059] italic font-serif">WITH DIGNITY.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed text-pretty"
          >
            Led by <strong>Ntebaleng Thobakgale</strong>, Director, Admitted Attorney, Conveyancer & Notary Public.
            Comprehensive representation in property transfers, deceased estate administration, high-stakes commercial litigation,
            and 24/7 urgent bail defense.
          </motion.p>
        </div>

        {/* Wireframe Hero Action Row: "Book Now" on Left | "Opening Hours" on Right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 items-stretch"
        >
          {/* LEFT SIDE: "Book Now" + Instant WhatsApp CTA */}
          <div className="flex flex-col justify-center rounded-2xl border border-[#C5A059]/40 bg-gradient-to-br from-[#1E2024] to-[#151619] p-6 shadow-xl lg:col-span-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                Fast Track Consultation
              </span>
              <span className="text-[11px] text-slate-400">Response within 2 hours</span>
            </div>

            <h2 className="mt-2 text-xl font-bold font-serif text-white sm:text-2xl">
              Schedule Your Legal Consultation
            </h2>
            <p className="mt-1 text-xs text-slate-300">
              Confidential assessment with Director Ntebaleng Thobakgale or senior practice attorneys.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Primary Book Now Button (Matches Wireframe) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A37E36] px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-[#C5A059]/20 transition-all hover:brightness-110 w-full sm:w-auto"
              >
                <CalendarDays className="h-4 w-4" />
                <span>Book Now</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              {/* High-converting direct WhatsApp Action */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/27723786975?text=${encodeURIComponent('Hello Director Ntebaleng Thobakgale, I need legal consultation regarding my matter.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/60 bg-emerald-950/40 px-4 py-3.5 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-900/60 w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp Intake</span>
              </motion.a>
            </div>

            {/* Micro proof points */}
            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-4 border-t border-slate-800 pt-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                LPC Registered
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                Fidelity Fund Covered
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <Building className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                162 Marshall St, Polokwane
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: "Opening Hours" with Calendar Icon (Matches Wireframe) */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#1A1C20] p-6 shadow-xl lg:col-span-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Practice Hours
                </span>
                <h3 className="text-lg font-bold font-serif text-white sm:text-xl flex items-center gap-2 mt-1">
                  <span>Opening Hours</span>
                  <span className={`inline-block h-2 w-2 rounded-full ${liveSchedule.isOpen ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                </h3>
              </div>

              {/* Wireframe Calendar Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059] shadow-inner">
                <CalendarDays className="h-6 w-6" />
              </div>
            </div>

            {/* Schedule list */}
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-300 font-medium">Monday – Friday</span>
                <span className="font-semibold text-white">08:00 – 17:00</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-300 font-medium">Saturday</span>
                <span className="text-slate-400">By Appointment (Deeds Signatures)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Sunday & Public Holidays</span>
                <span className="text-slate-400">Closed for Walk-ins</span>
              </div>
            </div>

            {/* 24/7 Urgent Hotline Callout */}
            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-xs text-amber-200">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="h-3.5 w-3.5 text-amber-400" />
                  <span>24/7 Urgent Police Bail Line</span>
                </span>
                <a
                  href={`tel:${FIRM_DETAILS.mobileWhatsApp.replace(/\s+/g, '')}`}
                  className="rounded bg-amber-500/20 px-2 py-0.5 text-[11px] text-amber-300 font-mono hover:bg-amber-500/30 transition-colors"
                >
                  {FIRM_DETAILS.mobileWhatsApp}
                </a>
              </div>
              <p className="mt-1 text-[11px] text-amber-300/80">
                Arrested or detained in Polokwane / Seshego? Call immediately for after-hours bail dispatch.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

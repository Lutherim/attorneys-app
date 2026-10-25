'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Award,
  FileCheck2,
  Scale,
  Building,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative bg-[#141518] py-16 sm:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DFBE7A]">
            04 · Regulatory & Professional Standing
          </span>
          <h2 className="mt-1 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Professional Certifications & Statutory Admissions
          </h2>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-300">
            Ntebaleng Thobakgale Attorneys operates in strict compliance with the statutory codes and ethical canons of the South African Legal Practice Council and superior courts.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#1A1C20] p-6 shadow-xl hover:border-[#C5A059] transition-all"
            >
              <div>
                {/* Header Icon + Regulatory Body */}
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    {cert.status}
                  </span>
                </div>

                <span className="mt-4 block text-[11px] font-bold uppercase tracking-wider text-[#DFBE7A]">
                  {cert.regulatoryBody}
                </span>

                <h3 className="mt-1 font-serif text-lg font-bold text-white">
                  {cert.title}
                </h3>

                <p className="mt-1 text-xs text-slate-400 font-mono">
                  Ref: {cert.certificateNumber}
                </p>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Authority & Year */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[200px]">{cert.issuingAuthority}</span>
                <span className="font-semibold text-[#DFBE7A]">Since {cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust & Guarantee Banner */}
        <div className="mt-10 rounded-2xl border border-[#C5A059]/40 bg-gradient-to-r from-[#1E2024] via-[#16171B] to-[#121316] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-[#C5A059]" />
                <span>100% Fidelity Fund Protected Client Trust Accounts</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
                Every client cent deposited for property transactions, RAF settlements, or deceased estates is held in our audited trust accounts under Section 86 of the Legal Practice Act, safeguarded by the Legal Practitioners’ Fidelity Fund.
              </p>
            </div>
            <a
              href="tel:0158883356"
              className="shrink-0 rounded-xl bg-[#C5A059] px-5 py-2.5 text-xs font-bold text-black hover:bg-[#B38F46] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Verify Practice Enrollment</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

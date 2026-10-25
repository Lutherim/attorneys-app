'use client';

import React from 'react';
import Image from 'next/image';
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
  Quote,
} from 'lucide-react';
import { TEAM_MEMBERS, FIRM_DETAILS } from '@/lib/data';
import { TeamMember } from '@/types/legal';

interface TeamSectionProps {
  onOpenBooking: (serviceSlug?: string, attorneyName?: string) => void;
}

export default function TeamSection({ onOpenBooking }: TeamSectionProps) {
  return (
    <section id="team" className="relative bg-[#FBF9F5] dark:bg-[#0E0F12] text-slate-900 dark:text-white">
      {/* Team Section Header */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <div className="text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A37E36] dark:text-[#DFBE7A]">
            03 · Our Legal Practitioners & Specialists
          </span>
          <h2 className="mt-1 font-serif text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900 dark:text-white">
            Meet Our Legal Team
          </h2>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Every legal practitioner at Ntebaleng Thobakgale Attorneys brings specialised acumen, courtroom tenacity, and unwavering devotion to defending your rights with dignity.
          </p>
        </div>
      </div>

      {/* Each person spends the entire page / full viewport width alternating layout as requested:
          "on the time page make sure each person has an img at the left sie then the right side talk about what they do? make sure each person info spends the entire page followed by another person" */}
      <div className="mt-12 divide-y divide-slate-200 dark:divide-slate-800">
        {TEAM_MEMBERS.map((member, index) => (
          <div
            key={member.id}
            id={`team-member-${member.id}`}
            className="relative min-h-[85vh] flex items-center py-16 sm:py-24"
          >
            {/* Subtle background highlight for the lead director */}
            {index === 0 && (
              <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/5 via-transparent to-transparent pointer-events-none" />
            )}

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                {/* LEFT SIDE: Image of the person */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-5"
                >
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                    {/* Frame with refined Gold border */}
                    <div className="relative overflow-hidden rounded-2xl border-2 border-[#C5A059]/40 bg-white p-2 shadow-2xl dark:border-[#C5A059]/30 dark:bg-slate-900">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
                        <Image
                          src={member.imageUrl}
                          alt={`${member.name} - ${member.role}`}
                          fill
                          className="object-cover object-top transition-transform duration-700 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Floating Name Badge over Photo */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="rounded bg-[#C5A059] px-2 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
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

                      {/* Micro Contact Bar underneath image */}
                      <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/80 text-xs">
                        <a
                          href={`tel:${member.phone.replace(/\s+/g, '')}`}
                          className="flex items-center gap-1.5 text-slate-700 hover:text-[#C5A059] dark:text-slate-300 transition-colors font-medium"
                        >
                          <Phone className="h-3.5 w-3.5 text-[#C5A059]" />
                          <span>{member.phone}</span>
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-1.5 text-slate-700 hover:text-[#C5A059] dark:text-slate-300 transition-colors truncate max-w-[160px]"
                        >
                          <Mail className="h-3.5 w-3.5 text-[#C5A059]" />
                          <span className="truncate">{member.email}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* RIGHT SIDE: Talks about what they do! */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-7 space-y-5"
                >
                  {/* Category & Experience Tag */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#C5A059]/15 px-3 py-1 text-xs font-bold text-[#A37E36] dark:text-[#DFBE7A]">
                      {member.role}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {member.experienceYears}+ Years Legal Practice
                    </span>
                  </div>

                  {/* Name and Official Qualifications */}
                  <div>
                    <h3 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base font-semibold text-[#A37E36] dark:text-[#DFBE7A] flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 shrink-0 text-[#C5A059]" />
                      <span>{member.qualifications}</span>
                    </p>
                  </div>

                  {/* Admissions / Court Credentials */}
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

                  {/* Detailed Bio */}
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {member.bio}
                  </p>

                  {/* DEDICATED SECTION: "What [Name] Does at Ntebaleng Thobakgale Attorneys" */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#15161A]">
                    <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                      <Briefcase className="h-4 w-4 text-[#C5A059]" />
                      <span>What {member.name.split(' ')[0]} Does in Practice:</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {member.whatTheyDo.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="h-4 w-4 shrink-0 text-[#C5A059] mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specializations Pill Tags */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Specialist Competencies
                    </h5>
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

                  {/* Quote */}
                  <div className="border-l-2 border-[#C5A059] pl-4 italic text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-serif">
                    &ldquo;{member.quote}&rdquo;
                  </div>

                  {/* Consultation CTA */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenBooking(undefined, member.name)}
                      className="flex items-center gap-2 rounded-xl bg-[#C5A059] px-5 py-3 text-xs font-bold text-black shadow-md transition-all hover:bg-[#B38F46]"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Book Consultation With {member.name.split(' ')[0]}</span>
                    </motion.button>

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
          </div>
        ))}
      </div>
    </section>
  );
}

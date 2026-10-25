'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle,
  AlertTriangle,
  Contact2,
  Map,
  ClipboardList,
} from 'lucide-react';
import { FIRM_DETAILS } from '@/lib/data';
import { createCaseUrgencyClassifier, createRateLimiterClosure } from '@/lib/business-logic';

const rateLimiter = createRateLimiterClosure(5);
const urgencyClassifier = createCaseUrgencyClassifier();

export default function ContactAndMaps() {
  const [activeTab, setActiveTab] = useState<'contact' | 'maps' | 'forms'>('contact');

  const [formState, setFormState] = useState({
    fullName: '',
    phone: '',
    email: '',
    matterType: 'Property Transfer / Conveyancing',
    message: '',
    isUrgentArrest: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormState((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Rate limiter closure check
    const check = rateLimiter('client-ip');
    if (!check.allowed) {
      setErrorMessage('Too many submissions. Please contact our office directly by phone or WhatsApp.');
      return;
    }

    if (!formState.fullName || !formState.phone || !formState.message) {
      setErrorMessage('Please fill in all required fields (Name, Phone, and Matter Details).');
      return;
    }

    setIsSubmitting(true);

    // Evaluate urgency closure
    const urgency = urgencyClassifier(formState.message + (formState.isUrgentArrest ? ' arrest bail emergency' : ''));

    // Simulated async backend persistence
    await new Promise((resolve) => setTimeout(resolve, 600));

    const ref = `NT-INTAKE-${Math.floor(1000 + Math.random() * 9000)}`;
    setIsSubmitting(false);
    setSubmittedRef(ref);
  };

  // Google Maps Embed URL for 162 Marshall Street, Polokwane, 0700
  const mapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.763073998797!2d29.46671047648358!3d-23.904400078564177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec6d78216d00001%3A0x6b490b4d45d31590!2s162%20Marshall%20St%2C%20Polokwane%20Central%2C%20Polokwane%2C%200700%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1711200000000!5m2!1sen!2sza`;

  return (
    <section id="contact" className="relative bg-[#111215] py-16 sm:py-24 text-white">
      {/* House as subtle background where necessary */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]">
        <Image
          src="/assets/aistudio/home_img_16f7397a.png"
          alt="162 Marshall Street Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DFBE7A]">
            06 · Reach Our Chambers
          </span>
          <h2 className="mt-1 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Contact Us & Practice Location
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Conveniently situated in central Polokwane at 162 Marshall Street with secure client parking. Direct access via phone, WhatsApp, Google Maps, and our intake portal.
          </p>
        </div>

        {/* WIREFRAME BOTTOM ACTION BAR: [ Contact us | Google Maps | Forms ] */}
        <div className="mt-8 flex justify-center sm:justify-start">
          <div className="flex w-full sm:w-auto rounded-xl bg-[#1A1C20] p-1 border border-slate-800 shadow-md">
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'contact'
                  ? 'bg-[#C5A059] text-black shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Contact2 className="h-4 w-4 shrink-0" />
              <span>Contact Us</span>
            </button>

            <button
              onClick={() => setActiveTab('maps')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'maps'
                  ? 'bg-[#C5A059] text-black shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Map className="h-4 w-4 shrink-0" />
              <span>Google Maps</span>
            </button>

            <button
              onClick={() => setActiveTab('forms')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'forms'
                  ? 'bg-[#C5A059] text-black shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ClipboardList className="h-4 w-4 shrink-0" />
              <span>Forms & Intake</span>
            </button>
          </div>
        </div>

        {/* Content Area Based on Wireframe Elements */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT 5 COLS: Contact Card & Quick Info (Always Visible on Desktop, matches wireframe) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Physical Practice Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#16171B] p-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#C5A059]">
                  <Image
                    src="/assets/aistudio/details_personal_ab42654f.jpg"
                    alt="Firm Signboard"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white">
                    {FIRM_DETAILS.firmName}
                  </h3>
                  <p className="text-xs text-[#DFBE7A]">
                    {FIRM_DETAILS.director} · Director
                  </p>
                </div>
              </div>

              {/* Direct Communication Lines */}
              <div className="mt-5 space-y-4 text-xs">
                {/* Physical Location */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C5A059]/10 text-[#C5A059]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold text-[10px] uppercase">
                      Physical Chambers
                    </span>
                    <span className="text-white font-medium">
                      {FIRM_DETAILS.streetAddress}, {FIRM_DETAILS.suburbCity}, {FIRM_DETAILS.postalCode}
                    </span>
                    <span className="block text-[11px] text-slate-400">Limpopo, South Africa</span>
                  </div>
                </div>

                {/* Landline Phone */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C5A059]/10 text-[#C5A059]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold text-[10px] uppercase">
                      Landline (Reception)
                    </span>
                    <a
                      href={`tel:${FIRM_DETAILS.landlinePhone.replace(/\s+/g, '')}`}
                      className="text-white hover:text-[#DFBE7A] font-semibold text-sm transition-colors"
                    >
                      {FIRM_DETAILS.landlinePhone}
                    </a>
                  </div>
                </div>

                {/* Mobile / 24-7 WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold text-[10px] uppercase">
                      Mobile & WhatsApp (24/7 Urgent Bail)
                    </span>
                    <a
                      href={`https://wa.me/27723786975?text=${encodeURIComponent('Hello Ntebaleng Thobakgale Attorneys, I am reaching out for legal counsel.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors flex items-center gap-1"
                    >
                      <span>{FIRM_DETAILS.mobileWhatsApp}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C5A059]/10 text-[#C5A059]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold text-[10px] uppercase">
                      Official Inquiries Email
                    </span>
                    <a
                      href={`mailto:${FIRM_DETAILS.email}`}
                      className="text-white hover:text-[#DFBE7A] font-medium transition-colors"
                    >
                      {FIRM_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Consultation Booking Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/27723786975?text=${encodeURIComponent('Hello Director Ntebaleng Thobakgale, I want to book a consultation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat With Us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Emergency Hotline Alert */}
            <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4 text-xs text-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="h-4 w-4" />
                <span>24/7 Police Station Callout</span>
              </div>
              <p className="mt-1 text-[11px] text-amber-300/80">
                Detained at Polokwane Central SAPS, Seshego, or Mankweng? Our criminal defense attorney dispatches immediately for bail.
              </p>
            </div>
          </div>

          {/* RIGHT 7 COLS: Google Maps Embed OR Interactive Intake Form */}
          <div className="lg:col-span-7">
            {activeTab === 'maps' || activeTab === 'contact' ? (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#16171B] shadow-2xl">
                  {/* Google Maps header bar */}
                  <div className="flex items-center justify-between border-b border-slate-800 bg-[#1A1C20] px-5 py-3 text-xs">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <MapPin className="h-4 w-4 text-[#C5A059]" />
                      <span>162 Marshall Street, Polokwane, 0700</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=162+Marshall+Street,+Polokwane,+0700"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#DFBE7A] hover:underline text-[11px] font-semibold"
                    >
                      <span>Open Directions</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  {/* Interactive Google Maps iframe */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-800">
                    <iframe
                      src={mapsEmbedUrl}
                      title="Google Maps Location - Ntebaleng Thobakgale Attorneys"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full filter contrast-[0.95]"
                    />
                  </div>

                  {/* Office Premises Photo Strip */}
                  <div className="p-4 bg-[#141518] border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-[#C5A059]" />
                      <span>Secure On-Site Client Parking Available</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      GPS: -23.9044° S, 29.4689° E
                    </span>
                  </div>
                </div>

                {activeTab === 'contact' && (
                  <div className="rounded-xl border border-slate-800 bg-[#16171B] p-4 text-xs text-slate-300 flex items-center justify-between">
                    <span>Need to submit formal case details?</span>
                    <button
                      onClick={() => setActiveTab('forms')}
                      className="font-bold text-[#DFBE7A] hover:underline flex items-center gap-1"
                    >
                      <span>Open Online Intake Form</span>
                      <ClipboardList className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {/* INTAKE FORM (When Forms tab is active, or if user switched) */}
            {activeTab === 'forms' && (
              <div className="rounded-2xl border border-slate-700/80 bg-[#16171B] p-6 shadow-2xl">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFBE7A]">
                    Official Intake Portal
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                    Case Evaluation & Intake Form
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your brief is reviewed confidentially by Director Ntebaleng Thobakgale under Attorney-Client Privilege.
                  </p>
                </div>

                {submittedRef ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">
                      Intake Form Received
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Thank you, {formState.fullName}. Your matter reference is <strong className="font-mono text-[#DFBE7A]">{submittedRef}</strong>. Our chambers will contact you at <strong>{formState.phone}</strong>.
                    </p>
                    <div className="pt-3">
                      <button
                        onClick={() => {
                          setSubmittedRef(null);
                          setFormState({
                            fullName: '',
                            phone: '',
                            email: '',
                            matterType: 'Property Transfer / Conveyancing',
                            message: '',
                            isUrgentArrest: false,
                          });
                        }}
                        className="rounded-lg bg-[#C5A059] px-4 py-2 text-xs font-bold text-black"
                      >
                        Submit Another Form
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
                    {errorMessage && (
                      <div className="rounded-lg bg-rose-950/40 border border-rose-500/40 p-3 text-rose-300">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formState.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Mpho Phago"
                          required
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300">
                          Contact Telephone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleInputChange}
                          placeholder="072 378 6975"
                          required
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          placeholder="client@domain.co.za"
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300">
                          Area of Law / Service *
                        </label>
                        <select
                          name="matterType"
                          value={formState.matterType}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-[#C5A059] focus:outline-none"
                        >
                          <option>Property Transfer / Conveyancing</option>
                          <option>Administration of Deceased Estates</option>
                          <option>24/7 Urgent Bail Application</option>
                          <option>Antenuptial Contract (ANC)</option>
                          <option>Commercial Litigation & Dispute</option>
                          <option>Road Accident Fund (RAF) Claim</option>
                          <option>Unlawful Arrest & Detention Damages</option>
                          <option>Debt Review Removal (Section 71)</option>
                          <option>Divorce & Maintenance</option>
                          <option>Drafting Contracts or Wills</option>
                          <option>Other Legal Matter</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300">
                        Matter Details & Specific Questions *
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Please summarize the facts, dates, court or police station names, and any urgent deadlines..."
                        required
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    {/* Urgent Bail / Arrest Checkbox */}
                    <div className="flex items-center gap-2 rounded-lg bg-amber-950/20 border border-amber-600/30 p-2.5">
                      <input
                        type="checkbox"
                        id="isUrgentArrest"
                        name="isUrgentArrest"
                        checked={formState.isUrgentArrest}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-amber-600 text-[#C5A059] focus:ring-[#C5A059]"
                      />
                      <label htmlFor="isUrgentArrest" className="text-amber-200 text-xs font-semibold cursor-pointer">
                        This is an emergency arrest / urgent 24-hour court matter
                      </label>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-3 pt-2">
                      <span className="text-[11px] text-slate-400 text-center sm:text-left">
                        Confidential · Direct Law Firm Intake
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-6 py-3 sm:py-2.5 text-xs font-bold text-black shadow-md hover:bg-[#B38F46] disabled:opacity-50"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>{isSubmitting ? 'Transmitting...' : 'Submit Case Intake'}</span>
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

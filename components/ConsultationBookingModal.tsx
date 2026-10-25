'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Phone,
  User,
  Scale,
} from 'lucide-react';
import { LEGAL_SERVICES, TEAM_MEMBERS, FIRM_DETAILS } from '@/lib/data';
import { ConsultationBookingEngine, createCaseUrgencyClassifier } from '@/lib/business-logic';

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceSlug?: string;
  initialAttorneyName?: string;
}

export default function ConsultationBookingModal({
  isOpen,
  onClose,
  initialServiceSlug,
  initialAttorneyName,
}: ConsultationBookingModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    serviceSlug: initialServiceSlug || 'registration-of-properties',
    attorneyName: initialAttorneyName || 'Ntebaleng Thobakgale (Director)',
    consultationType: 'in_person' as const,
    preferredDate: '',
    preferredTime: '10:00 AM',
    caseSummary: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    const engine = new ConsultationBookingEngine();
    const validation = engine.validateBooking({
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      caseSummary: formData.caseSummary,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    const refNumber = engine.generateReferenceNumber(formData.serviceSlug);

    // Simulated async server persistence
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setConfirmedRef(refNumber);
  };

  const selectedService = LEGAL_SERVICES.find((s) => s.slug === formData.serviceSlug) || LEGAL_SERVICES[0];

  const engine = new ConsultationBookingEngine();
  const whatsappUrl = engine.buildWhatsAppLink({
    clientName: formData.clientName || 'Client',
    serviceTitle: selectedService.title,
    preferredDate: formData.preferredDate || 'Next Available Slot',
    preferredTime: formData.preferredTime || 'Morning',
    caseSummary: formData.caseSummary || 'Legal Consultation Request',
    urgency: 'Standard',
    referenceNumber: confirmedRef || 'DIRECT-BOOK',
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-[#16171B] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-[#16171B]/95">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#A37E36] dark:text-[#DFBE7A]">
                Ntebaleng Thobakgale Attorneys · Polokwane
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                Book a Legal Consultation
              </h3>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {confirmedRef ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h4 className="font-serif text-2xl font-bold">
                  Consultation Request Confirmed
                </h4>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-xs space-y-1.5 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Official Reference:</span>
                    <strong className="font-mono text-[#A37E36] dark:text-[#DFBE7A]">{confirmedRef}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Matter:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Practitioner:</span>
                    <span className="font-semibold">{formData.attorneyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Slot:</span>
                    <span className="font-semibold">{formData.preferredDate} at {formData.preferredTime}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  A copy of your appointment details has been routed to our chambers at 162 Marshall Street. You can forward your brief immediately to Director Ntebaleng Thobakgale via WhatsApp.
                </p>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Send to Director on WhatsApp</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="rounded-xl border border-slate-300 px-5 py-3 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errors.length > 0 && (
                  <div className="rounded-xl bg-rose-50 p-3 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                    <div className="font-semibold flex items-center gap-1.5 mb-1">
                      <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      <span>Please check the following:</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {errors.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="e.g., Nteboeng Matlala"
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      South African Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleInputChange}
                      placeholder="072 378 6975"
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      placeholder="client@gmail.com"
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Select Service / Matter Type *
                    </label>
                    <select
                      name="serviceSlug"
                      value={formData.serviceSlug}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      {LEGAL_SERVICES.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Preferred Time Slot *
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      <option>09:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>02:00 PM</option>
                      <option>03:30 PM</option>
                      <option>04:15 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Practitioner
                    </label>
                    <select
                      name="attorneyName"
                      value={formData.attorneyName}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      <option>Ntebaleng Thobakgale (Director)</option>
                      <option>Kgomotso Malatji (Commercial Litigation)</option>
                      <option>Tumelo Phasha (Criminal Defense & Bail)</option>
                      <option>Lesedi Mokoena (Estates & Costs)</option>
                      <option>Thabo Mamabolo (RAF Claims)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Brief Matter Summary *
                  </label>
                  <textarea
                    name="caseSummary"
                    rows={3}
                    value={formData.caseSummary}
                    onChange={handleInputChange}
                    placeholder="Briefly state what assistance you require (e.g., buying property in Polokwane, urgent bail, drafting antenuptial contract)..."
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 text-center sm:text-left">
                    Chambers: 162 Marshall St, Polokwane · 015 888 3356
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-6 py-3 sm:py-2.5 text-xs font-bold text-black shadow-md hover:bg-[#B38F46] disabled:opacity-50"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>{isSubmitting ? 'Confirming...' : 'Confirm Consultation'}</span>
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

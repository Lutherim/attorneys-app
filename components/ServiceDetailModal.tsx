'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Clock,
  FileCheck2,
  ListChecks,
  ShieldCheck,
  MessageCircle,
  Phone,
  Send,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { LegalService } from '@/types/legal';
import { ConsultationBookingEngine, createCaseUrgencyClassifier } from '@/lib/business-logic';
import { FIRM_DETAILS } from '@/lib/data';

interface ServiceDetailModalProps {
  service: LegalService | null;
  onClose: () => void;
  onSuccessBooking?: (reference: string) => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onSuccessBooking,
}: ServiceDetailModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    preferredDate: '',
    preferredTime: '10:00 AM',
    consultationType: 'in_person' as const,
    caseSummary: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  if (!service) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors([]);

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
      setValidationErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Evaluate case urgency closure
    const urgencyClassifier = createCaseUrgencyClassifier();
    const evaluated = urgencyClassifier(formData.caseSummary + ' ' + service.title);

    const refNumber = engine.generateReferenceNumber(service.slug);

    // Simulate asynchronous server persistence
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setBookingConfirmed(refNumber);
    if (onSuccessBooking) onSuccessBooking(refNumber);
  };

  const engine = new ConsultationBookingEngine();
  const whatsappUrl = engine.buildWhatsAppLink({
    clientName: formData.clientName || 'Prospective Client',
    serviceTitle: service.title,
    preferredDate: formData.preferredDate || 'Next Available',
    preferredTime: formData.preferredTime || 'Morning',
    caseSummary: formData.caseSummary || `Inquiring about ${service.title}`,
    urgency: service.isUrgentCapable ? 'Urgent' : 'Standard',
    referenceNumber: bookingConfirmed || 'INQUIRY-PRE',
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-[#16171B] border border-slate-200 dark:border-slate-800"
        >
          {/* Header Banner */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-[#16171B]/95">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#A37E36] dark:text-[#DFBE7A]">
                {service.category}
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                {service.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Overview & Key Metadata */}
            <div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {service.fullDescription}
              </p>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Standard Consultation</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-[#C5A059]" />
                    {service.estimatedDurationMin} Minutes
                  </span>
                </div>

                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Fee Guidance</span>
                  <span className="font-semibold text-[#A37E36] dark:text-[#DFBE7A] mt-0.5 block">
                    {service.baseFee}
                  </span>
                </div>

                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Urgent Dispatch</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                    {service.isUrgentCapable ? 'Available (24/7)' : 'Office Hours'}
                  </span>
                </div>

                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Primary Location</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
                    162 Marshall St
                  </span>
                </div>
              </div>
            </div>

            {/* Two Column Layout: Deliverables & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Documents Required */}
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800 bg-[#FBF9F5] dark:bg-[#1A1C20]">
                <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-3">
                  <FileCheck2 className="h-4 w-4 text-[#C5A059]" />
                  <span>Required Documents Checklist</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {service.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Deliverables & Process */}
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800 bg-[#FBF9F5] dark:bg-[#1A1C20]">
                <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-3">
                  <ListChecks className="h-4 w-4 text-[#C5A059]" />
                  <span>Key Deliverables & Process</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {service.keyDeliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SEPARATE BOOKING SECTION FOR THIS EXACT SERVICE */}
            <div className="rounded-2xl border-2 border-[#C5A059]/40 bg-white p-5 sm:p-6 shadow-md dark:bg-[#131417]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
                <div>
                  <h4 className="font-serif text-base font-bold text-slate-900 sm:text-lg dark:text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#C5A059]" />
                    <span>Instant Booking: {service.title}</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Direct scheduling with Ntebaleng Thobakgale Attorneys chambers.
                  </p>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              {bookingConfirmed ? (
                <div className="py-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h5 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                    Consultation Request Confirmed
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Your reference number is <strong className="font-mono text-[#A37E36] dark:text-[#DFBE7A]">{bookingConfirmed}</strong>. Our chambers will contact you at <strong>{formData.clientPhone}</strong> to confirm your slot.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Send Details to Director on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setBookingConfirmed(null)}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300"
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
                  {validationErrors.length > 0 && (
                    <div className="rounded-lg bg-rose-50 p-3 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                      <div className="font-semibold flex items-center gap-1.5 mb-1">
                        <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                        <span>Please fix the following:</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {validationErrors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Full Name & Surname *
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="e.g., Tshepo Mabasa"
                        required
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
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
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Consultation Mode
                      </label>
                      <select
                        name="consultationType"
                        value={formData.consultationType}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      >
                        <option value="in_person">In-Person (162 Marshall St)</option>
                        <option value="virtual_zoom">Virtual Consultation (Zoom/Teams)</option>
                        <option value="phone_call">Telephone Consultation</option>
                        {service.isUrgentCapable && (
                          <option value="urgent_police_station_callout">Emergency Police Station Callout</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Summary of Your Matter (Confidential) *
                    </label>
                    <textarea
                      name="caseSummary"
                      rows={3}
                      value={formData.caseSummary}
                      onChange={handleInputChange}
                      placeholder={`Please describe your requirements for ${service.title}...`}
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-3 pt-2">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left">
                      Protected by Attorney-Client Privilege. Registered under Legal Practice Council.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-6 py-3 sm:py-2.5 text-xs font-bold text-black shadow-md transition-all hover:bg-[#B38F46] disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{isSubmitting ? 'Submitting Request...' : `Book ${service.title}`}</span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

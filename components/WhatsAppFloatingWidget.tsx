'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  X,
  PhoneCall,
  Scale,
  ShieldAlert,
  ArrowRight,
  Send,
} from 'lucide-react';
import { FIRM_DETAILS } from '@/lib/data';

export default function WhatsAppFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickTopics = [
    {
      label: '24/7 Emergency Bail Dispatch',
      msg: 'EMERGENCY: Someone has been arrested. I need immediate after-hours bail assistance in Polokwane.',
      isEmergency: true,
    },
    {
      label: 'Property Transfer / Conveyancing',
      msg: 'Hello Director Ntebaleng Thobakgale, I need assistance with a property transfer/conveyancing in Limpopo.',
      isEmergency: false,
    },
    {
      label: 'Deceased Estate Administration',
      msg: 'Good day, I need legal help reporting and administering a deceased estate with the Master of the High Court.',
      isEmergency: false,
    },
    {
      label: 'Antenuptial Contract (ANC)',
      msg: 'Hello, my partner and I would like to consult on drafting and registering an Antenuptial Contract before our wedding.',
      isEmergency: false,
    },
    {
      label: 'Road Accident Fund Claim',
      msg: 'Hello, I was involved in a motor vehicle accident and wish to consult regarding an RAF claim.',
      isEmergency: false,
    },
  ];

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = `https://wa.me/27723786975?text=${encodeURIComponent(customMsg)}`;
    setCustomMsg('');
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-[340px] sm:max-w-[360px] overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#16171B] text-white shadow-2xl"
          >
            {/* Widget Top Banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-emerald-300">
                    <MessageCircle className="h-5 w-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-emerald-900 bg-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold">
                      {FIRM_DETAILS.director}
                    </h4>
                    <p className="text-[11px] text-emerald-200">
                      Director · Admitted Attorney & Notary
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 text-emerald-200 hover:bg-emerald-700/50"
                  aria-label="Close WhatsApp chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body with Quick Topics */}
            <div className="p-4 space-y-3">
              <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/20 p-2.5 text-xs text-emerald-200">
                <p className="text-[11px] leading-relaxed">
                  Welcome to Ntebaleng Thobakgale Attorneys (162 Marshall St, Polokwane). Tap a matter below to open an encrypted WhatsApp consultation:
                </p>
              </div>

              <div className="space-y-1.5">
                {quickTopics.map((topic, i) => (
                  <a
                    key={i}
                    href={`https://wa.me/27723786975?text=${encodeURIComponent(topic.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors ${
                      topic.isEmergency
                        ? 'border border-amber-500/40 bg-amber-950/40 text-amber-200 hover:bg-amber-900/60 font-semibold'
                        : 'border border-slate-800 bg-[#1F2126] text-slate-200 hover:border-emerald-500/40 hover:bg-[#25282F]'
                    }`}
                  >
                    <span>{topic.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                  </a>
                ))}
              </div>

              {/* Direct Input */}
              <form onSubmit={handleSendCustom} className="pt-2 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type a custom inquiry..."
                  className="w-full rounded-lg border border-slate-700 bg-[#121316] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>

              <div className="text-[10px] text-center text-slate-400">
                Official Business Number: +27 72 378 6975
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp conversation"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl shadow-emerald-900/50 hover:bg-emerald-500 transition-colors"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-60" />
        
        {isOpen ? (
          <X className="relative z-10 h-6 w-6" />
        ) : (
          <MessageCircle className="relative z-10 h-7 w-7" />
        )}

        {/* Small floating unread indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A059] text-[9px] font-bold text-black border border-white">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  Phone,
  Scale,
  Sparkles,
} from 'lucide-react';
import { FAQS } from '@/lib/data';
import { FAQItem } from '@/types/legal';

interface QnAPageProps {
  onSelectService?: (slug: string) => void;
}

export default function QnAPage({ onSelectService }: QnAPageProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Property & Conveyancing',
    'Criminal & 24/7 Bail',
    'Deceased Estates & Wills',
    'Road Accident Fund (RAF)',
    'Family & Marriage',
    'Unlawful Arrest',
    'Debt Review & Credit',
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category.toLowerCase().includes(activeCategory.toLowerCase().slice(0, 8));
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="qna" className="relative bg-[#FBF9F5] dark:bg-[#111215] py-16 sm:py-24 text-slate-900 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A37E36] dark:text-[#DFBE7A]">
            05 · Legal Knowledge & Guidance
          </span>
          <h2 className="mt-1 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
            Questions & Answers (Legal FAQ)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Practical answers to frequent legal inquiries regarding property transfers, after-hours bail, RAF payouts, and estate planning under South African law.
          </p>
        </div>

        {/* Search Bar & Filters */}
        <div className="mt-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal questions (e.g., bail, title deed, RAF)..."
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-[#C5A059] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#C5A059] text-black font-semibold shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mt-10 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
              No matching legal questions found. Ask Director Ntebaleng Thobakgale directly on WhatsApp.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-[#C5A059]/50 dark:border-slate-800 dark:bg-[#16171B]"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors"
                  >
                    <div className="flex items-start gap-3 pr-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#C5A059]/15 text-[#A37E36] dark:text-[#DFBE7A] mt-0.5">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#A37E36] dark:text-[#DFBE7A]">
                          {faq.category}
                        </span>
                        <h3 className="font-serif text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-slate-400"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-slate-100 bg-[#FAF8F5] px-5 py-4 dark:border-slate-800 dark:bg-[#131417]"
                      >
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {faq.answer}
                        </p>

                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                          <span className="text-[11px] text-slate-400">
                            Applicable under South African statutory law
                          </span>
                          <a
                            href={`https://wa.me/27723786975?text=${encodeURIComponent(`Hello, I read the FAQ regarding: "${faq.question}" and would like to consult on my situation.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#A37E36] font-semibold hover:text-[#C5A059] dark:text-[#DFBE7A]"
                          >
                            <MessageCircle className="h-3 w-3" />
                            <span>Ask about this on WhatsApp</span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* WhatsApp Conversion Card */}
        <div className="mt-12 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/20 via-emerald-900/10 to-transparent p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              Have an urgent legal question not covered here?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Direct consultation via WhatsApp with Director Ntebaleng Thobakgale at <strong>+27 72 378 6975</strong>.
            </p>
          </div>
          <a
            href={`https://wa.me/27723786975?text=${encodeURIComponent('Hello Director Ntebaleng Thobakgale, I have a legal question regarding my situation.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat With Director on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

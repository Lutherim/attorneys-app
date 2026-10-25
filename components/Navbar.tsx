'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  MessageCircle,
  Calendar,
  ChevronRight,
  Scale,
} from 'lucide-react';
import Logo from './Logo';
import { FIRM_DETAILS } from '@/lib/data';
import { OfficeScheduleManager } from '@/lib/business-logic';

interface NavbarProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const [scheduleStatus] = useState<string>(() => {
    try {
      const schedule = new OfficeScheduleManager();
      const status = schedule.getLiveStatus();
      return status.isOpen ? 'Office Open Now' : '24/7 Urgent Bail Line Active';
    } catch {
      return '08:00 – 17:00';
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clean, uncluttered navigation links with spacious layout
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Team', href: '/team' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full font-sans">
      {/* Top Utility Bar */}
      <div className="hidden border-b border-slate-800 bg-[#121316] text-[12px] text-slate-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${FIRM_DETAILS.landlinePhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 transition-colors hover:text-[#C5A059]"
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>{FIRM_DETAILS.landlinePhone}</span>
            </a>
            <a
              href={`mailto:${FIRM_DETAILS.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-[#C5A059]"
            >
              <Mail className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>{FIRM_DETAILS.email}</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>{FIRM_DETAILS.streetAddress}, {FIRM_DETAILS.suburbCity}</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-[#DFBE7A]">
              <Clock className="h-3.5 w-3.5 text-[#C5A059]" />
              <span className="font-medium">{scheduleStatus}</span>
            </div>
            <a
              href={`https://wa.me/27723786975?text=${encodeURIComponent('Hello Ntebaleng Thobakgale Attorneys, I would like to make an inquiry.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 transition-colors hover:text-emerald-300"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar with generous spacing */}
      <nav
        className={`w-full border-b transition-all duration-200 ${
          isScrolled
            ? 'border-slate-200/80 bg-white/95 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-[#121316]/95'
            : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-[#141518]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo on the left & spacious Nav links starting with Home right after logo */}
          <div className="flex items-center gap-8 lg:gap-12">
            <Logo />

            {/* Desktop / Laptop Navigation Links with generous breathing room (NO burger on laptops!) */}
            <div className="hidden md:flex items-center gap-7 lg:gap-9">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'text-[#C5A059] font-bold border-b-2 border-[#C5A059] pb-0.5'
                        : 'text-slate-700 hover:text-[#C5A059] dark:text-slate-200 dark:hover:text-[#DFBE7A]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Action: Only the high-converting Book Consultation CTA (duplicate Contact Us removed) */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 rounded-xl bg-[#C5A059] px-5 py-2.5 text-xs font-bold text-black shadow-sm transition-all hover:bg-[#B38F46] hover:shadow"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Consultation</span>
            </motion.button>
          </div>

          {/* Mobile Right Bar: Direct Call, Email, and Burger Icon (ONLY visible on small phone screens < 768px!) */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`tel:${FIRM_DETAILS.landlinePhone.replace(/\s+/g, '')}`}
              aria-label="Call Office"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#C5A059] dark:border-slate-700 dark:text-slate-200"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${FIRM_DETAILS.email}`}
              aria-label="Email Office"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#C5A059] dark:border-slate-700 dark:text-slate-200"
            >
              <Mail className="h-4 w-4" />
            </a>

            {/* Burger button strictly for mobile phones */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white transition-colors hover:bg-slate-800 dark:bg-[#C5A059] dark:text-black"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Only triggers on phone screens from mobile burger) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#16171B] md:hidden"
          >
            <div className="space-y-1 px-4 pt-3 pb-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-[#F8F5EE] hover:text-[#C5A059] dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C5A059] py-3 text-sm font-bold text-black shadow-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Consultation Now</span>
                </button>

                <a
                  href={`https://wa.me/27723786975?text=${encodeURIComponent('Hello Ntebaleng Thobakgale Attorneys, I would like to speak to an attorney.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-800 transition-colors dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Chat on WhatsApp (+27 72 378 6975)</span>
                </a>

                <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
                  <div className="font-semibold flex items-center gap-1.5">
                    <Scale className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                    <span>24/7 Urgent Bail Hotline</span>
                  </div>
                  <p className="mt-1 text-[11px] text-amber-800 dark:text-amber-200">
                    If someone has been arrested, call our direct emergency line: <strong>+27 72 378 6975</strong>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

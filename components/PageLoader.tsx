'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Elegant minimum display duration for smooth entrance
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="law-firm-page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0E0F12] text-white"
        >
          {/* Central Scales & NT Monogram Emblem */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            {/* Gold Scaled Emblem with White Background */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#C5A059]/60 bg-white p-2.5 shadow-2xl shadow-[#C5A059]/20">
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 12 L50 48 M30 22 L70 22 M50 14 L30 22 M50 14 L70 22"
                  stroke="#C5A059"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22 36 C22 41 38 41 38 36 Z M30 22 L22 36 M30 22 L38 36"
                  stroke="#C5A059"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M62 36 C62 41 78 41 78 36 Z M70 22 L62 36 M70 22 L78 36"
                  stroke="#C5A059"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <rect x="47" y="48" width="6" height="20" fill="#C5A059" />
                <path d="M40 68 L60 68" stroke="#C5A059" strokeWidth="4" strokeLinecap="round" />
                <text x="20" y="94" fontFamily="serif" fontWeight="900" fontSize="32" fill="#111827">
                  N
                </text>
                <text x="52" y="94" fontFamily="serif" fontWeight="900" fontSize="32" fill="#C5A059">
                  T
                </text>
              </svg>
            </div>

            {/* Typography */}
            <div className="mt-4 text-center">
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                Ntebaleng <span className="text-[#C5A059]">Thobakgale</span>
              </h2>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mt-0.5">
                ATTORNEYS · CONVEYANCERS · NOTARIES
              </p>
              <p className="text-[10px] font-serif italic text-[#DFBE7A] mt-1">
                Defending Your Rights with Dignity.
              </p>
            </div>

            {/* Subtle Gold Progress Line */}
            <div className="mt-6 h-0.5 w-44 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                className="h-full w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

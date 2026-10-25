'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'gold';
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({
  className = '',
  variant = 'dark',
  showSlogan = true,
  size = 'md',
}: LogoProps) {
  const isLight = variant === 'light';
  const isSmall = size === 'sm';

  return (
    <Link
      href="/"
      className={`group flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-95 min-w-0 max-w-full ${className}`}
      aria-label="Ntebaleng Thobakgale Attorneys Home"
    >
      {/* Emblem SVG with white background matching official signboard */}
      <div
        className={`relative shrink-0 flex items-center justify-center rounded-xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-[#C5A059]/30 transition-transform duration-300 group-hover:scale-105 ${
          isSmall ? 'h-9 w-9 sm:h-10 sm:w-10 p-1' : 'h-10 w-10 sm:h-11 sm:w-11 p-1.5'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Classical Pillar & Scales of Justice in Warm Gold */}
          <path
            d="M50 12 L50 48 M30 22 L70 22 M50 14 L30 22 M50 14 L70 22"
            stroke="#C5A059"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Left Pan */}
          <path
            d="M22 36 C22 41 38 41 38 36 Z M30 22 L22 36 M30 22 L38 36"
            stroke="#C5A059"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Right Pan */}
          <path
            d="M62 36 C62 41 78 41 78 36 Z M70 22 L62 36 M70 22 L78 36"
            stroke="#C5A059"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Central Pillar Base */}
          <rect x="47" y="48" width="6" height="20" fill="#C5A059" />
          <path d="M40 68 L60 68" stroke="#C5A059" strokeWidth="4" strokeLinecap="round" />
          
          {/* Bold 'N' in deep black and 'T' in gold on white background */}
          <text
            x="20"
            y="94"
            fontFamily="serif"
            fontWeight="900"
            fontSize="32"
            fill="#111827"
          >
            N
          </text>
          <text
            x="52"
            y="94"
            fontFamily="serif"
            fontWeight="900"
            fontSize="32"
            fill="#C5A059"
          >
            T
          </text>
        </svg>
      </div>

      {/* Typography from Official Signboard - High Contrast, Properly Contained & Responsive */}
      <div className="flex flex-col text-left min-w-0 max-w-full overflow-hidden">
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0 min-w-0 max-w-full leading-tight">
          <span
            className={`font-serif ${
              isSmall
                ? 'text-base sm:text-lg lg:text-xl'
                : 'text-lg sm:text-2xl'
            } font-black tracking-tight leading-tight break-words ${
              isLight ? 'text-white' : 'text-slate-900 dark:text-white'
            }`}
          >
            Ntebaleng
          </span>
          <span
            className={`font-serif ${
              isSmall
                ? 'text-base sm:text-lg lg:text-xl'
                : 'text-lg sm:text-2xl'
            } font-bold tracking-tight text-[#C5A059] leading-tight break-words`}
          >
            Thobakgale
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-wrap">
          <span
            className={`font-bold tracking-[0.16em] uppercase ${
              isSmall ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-[11px]'
            } ${isLight ? 'text-slate-200' : 'text-slate-800 dark:text-slate-200'}`}
          >
            ATTORNEYS
          </span>
          <span className="text-[#C5A059] text-[9px] font-bold">·</span>
          <span
            className={`text-[#A37E36] dark:text-[#DFBE7A] font-semibold truncate ${
              isSmall ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-[11px]'
            } hidden xs:inline sm:inline`}
          >
            Conveyancers · Notaries
          </span>
        </div>
        {showSlogan && (
          <span className="text-[9px] sm:text-[10px] italic tracking-wide text-slate-500 dark:text-slate-400 font-serif hidden sm:block truncate">
            Defending Your Rights with Dignity.
          </span>
        )}
      </div>
    </Link>
  );
}

import React from 'react';

/**
 * High-definition vector SVG Country Flags.
 * Fixes Windows OS emoji rendering issue where flag emojis show up as two-letter codes (e.g. "GB", "TR").
 */
export default function FlagIcon({ code, className = "w-4.5 h-3.5 rounded-xs object-cover shadow-2xs" }) {
  const norm = (code || '').toLowerCase();

  switch (norm) {
    case 'tr': // Turkey
      return (
        <svg viewBox="0 0 1200 800" className={className} aria-label="Turkey Flag">
          <rect width="1200" height="800" fill="#E30A17" />
          <circle cx="425" cy="400" r="200" fill="#FFFFFF" />
          <circle cx="475" cy="400" r="160" fill="#E30A17" />
          <polygon
            points="583.3,400 706.7,360 630.4,465 630.4,335 706.7,440"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'en':
    case 'gb': // United Kingdom
      return (
        <svg viewBox="0 0 60 30" className={className} aria-label="United Kingdom Flag">
          <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z" />
          </clipPath>
          <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );

    case 'de': // Germany
      return (
        <svg viewBox="0 0 5 3" className={className} aria-label="Germany Flag">
          <rect width="5" height="1" y="0" fill="#000000" />
          <rect width="5" height="1" y="1" fill="#DD0000" />
          <rect width="5" height="1" y="2" fill="#FFCE00" />
        </svg>
      );

    case 'fr': // France
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="France Flag">
          <rect width="1" height="2" x="0" fill="#002395" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#ED2939" />
        </svg>
      );

    case 'es': // Spain
      return (
        <svg viewBox="0 0 750 500" className={className} aria-label="Spain Flag">
          <rect width="750" height="500" fill="#AA151B" />
          <rect width="750" height="250" y="125" fill="#F1BF00" />
        </svg>
      );

    case 'it': // Italy
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Italy Flag">
          <rect width="1" height="2" x="0" fill="#009246" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#CE2B37" />
        </svg>
      );

    case 'pt': // Portugal
      return (
        <svg viewBox="0 0 600 400" className={className} aria-label="Portugal Flag">
          <rect width="240" height="400" fill="#006600" />
          <rect width="360" height="400" x="240" fill="#FF0000" />
          <circle cx="240" cy="200" r="60" fill="#FFCC00" stroke="#000" strokeWidth="3" />
        </svg>
      );

    case 'nl': // Netherlands
      return (
        <svg viewBox="0 0 9 6" className={className} aria-label="Netherlands Flag">
          <rect width="9" height="2" y="0" fill="#AE1C28" />
          <rect width="9" height="2" y="2" fill="#FFFFFF" />
          <rect width="9" height="2" y="4" fill="#21468B" />
        </svg>
      );

    case 'pl': // Poland
      return (
        <svg viewBox="0 0 8 5" className={className} aria-label="Poland Flag">
          <rect width="8" height="2.5" y="0" fill="#FFFFFF" />
          <rect width="8" height="2.5" y="2.5" fill="#DC143C" />
        </svg>
      );

    case 'ka':
    case 'ge': // Georgia
      return (
        <svg viewBox="0 0 300 200" className={className} aria-label="Georgia Flag">
          <rect width="300" height="200" fill="#FFFFFF" />
          <rect width="40" height="200" x="130" fill="#FF0000" />
          <rect width="300" height="40" y="80" fill="#FF0000" />
          {/* 4 small crosses */}
          <g fill="#FF0000">
            <path d="M 60 30 h 10 v 20 h -10 z M 50 40 h 30 v 10 h -30 z" />
            <path d="M 230 30 h 10 v 20 h -10 z M 220 40 h 30 v 10 h -30 z" />
            <path d="M 60 150 h 10 v 20 h -10 z M 50 160 h 30 v 10 h -30 z" />
            <path d="M 230 150 h 10 v 20 h -10 z M 220 160 h 30 v 10 h -30 z" />
          </g>
        </svg>
      );

    case 'ga':
    case 'ie': // Ireland
      return (
        <svg viewBox="0 0 6 3" className={className} aria-label="Ireland Flag">
          <rect width="2" height="3" x="0" fill="#169B62" />
          <rect width="2" height="3" x="2" fill="#FFFFFF" />
          <rect width="2" height="3" x="4" fill="#FF883E" />
        </svg>
      );

    case 'ru': // Russia
      return (
        <svg viewBox="0 0 9 6" className={className} aria-label="Russia Flag">
          <rect width="9" height="2" y="0" fill="#FFFFFF" />
          <rect width="9" height="2" y="2" fill="#0039A6" />
          <rect width="9" height="2" y="4" fill="#D52B1E" />
        </svg>
      );

    case 'ar':
    case 'sa': // Saudi Arabia / Arabic
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Saudi Arabia Flag">
          <rect width="3" height="2" fill="#006C35" />
          <path d="M0.5,1.1 L2.5,1.1 M0.8,0.8 L2.2,0.8" stroke="#FFFFFF" strokeWidth="0.08" strokeLinecap="round" />
          <polygon points="1.5,1.3 1.4,1.4 1.6,1.4" fill="#FFFFFF" />
        </svg>
      );

    case 'zh':
    case 'cn': // China
      return (
        <svg viewBox="0 0 900 600" className={className} aria-label="China Flag">
          <rect width="900" height="600" fill="#DE2910" />
          <polygon
            points="150,75 168,131 228,131 179,166 198,222 150,187 102,222 121,166 72,131 132,131"
            fill="#FFDE00"
          />
          <circle cx="300" cy="60" r="18" fill="#FFDE00" />
          <circle cx="360" cy="120" r="18" fill="#FFDE00" />
          <circle cx="360" cy="210" r="18" fill="#FFDE00" />
          <circle cx="300" cy="270" r="18" fill="#FFDE00" />
        </svg>
      );

    default:
      return (
        <span className="inline-block px-1 text-[10px] font-bold uppercase bg-stone-700 text-white rounded">
          {norm.slice(0, 2)}
        </span>
      );
  }
}

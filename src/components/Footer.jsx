import React, { useState } from 'react';
import { Bot, FileCode, ArrowUpRight, Sparkles } from 'lucide-react';
import { companyData } from '../data/initialData';
import { getTranslation } from '../data/translations';

export default function Footer({ onSecretAdminTrigger, onOpenPdfCatalog, activeLang = 'en' }) {
  const [showAiModal, setShowAiModal] = useState(false);
  const t = (key) => getTranslation(key, activeLang);

  return (
    <>
      <footer className="relative z-10 backdrop-blur-2xl bg-[#FAF8F4]/90 dark:bg-[#111114] text-stone-700 dark:text-stone-300 pt-16 pb-12 border-t border-stone-200/80 dark:border-white/[0.06] transition-colors duration-500">
        {/* Top ambient highlight line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-stone-400/30 dark:via-white/15 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-200/80 dark:border-stone-800/60">
            {/* Brand Column */}
            <div className="space-y-4">
              <a href="#" className="inline-block group">
                <img
                  src="/images/logo.png"
                  alt="MakeMattress"
                  className="h-8 w-auto object-contain transition-all duration-300 dark:hidden group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
                />
                <img
                  src="/images/logo-white.svg"
                  alt="MakeMattress"
                  className="h-8 w-auto object-contain transition-all duration-300 hidden dark:block group-hover:drop-shadow-[0_4px_14px_rgba(255,255,255,0.75)]"
                />
              </a>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('footer_desc')}
              </p>
              <div className="pt-1 text-xs text-stone-600 dark:text-stone-400 space-y-1">
                <p>📍 {companyData.address}</p>
                <p>📞 {companyData.phone} &bull; ✉️ {companyData.email}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-[#8C7A58] dark:text-[#D4B37F]">
                {t('footer_nav')}
              </h4>
              <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">{t('nav_products')}</a></li>
                {onOpenPdfCatalog && (
                  <li>
                    <button
                      onClick={onOpenPdfCatalog}
                      className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                    >
                      <span>{t('pdf_catalog_button')} (3D)</span>
                    </button>
                  </li>
                )}
                <li><a href="#quality" className="hover:text-stone-900 dark:hover:text-white transition-colors">{t('nav_quality')}</a></li>
                <li><a href="#about" className="hover:text-stone-900 dark:hover:text-white transition-colors">{t('nav_about')}</a></li>
                <li><a href="#contact" className="hover:text-stone-900 dark:hover:text-white transition-colors">{t('nav_contact')}</a></li>
              </ul>
            </div>

            {/* Core Categories */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-[#8C7A58] dark:text-[#D4B37F]">
                Components
              </h4>
              <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">Mattress Tapes & Ribbons</a></li>
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">PE Packaging Films</a></li>
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">Thermobonded Felts</a></li>
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">Hotmelt Adhesives</a></li>
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">Zippered Mattress Covers</a></li>
              </ul>
            </div>

            {/* AI & Standards */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-[#8C7A58] dark:text-[#D4B37F]">
                AI & Standards
              </h4>
              <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                <li>
                  <a
                    href="/llms.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#8C7A58] dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Bot className="w-3.5 h-3.5 text-[#8C7A58] dark:text-amber-400" />
                    <span>llms.txt (AI Crawler)</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowAiModal(true)}
                    className="hover:text-stone-900 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                  >
                    <FileCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Schema.org JSON-LD</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright with discreet secret admin trigger */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <span
                onClick={onSecretAdminTrigger}
                className="cursor-pointer hover:text-stone-900 dark:hover:text-stone-300 transition-colors font-medium"
                title="MakeMattress B2B"
              >
                MakeMattress
              </span>
              . All rights reserved. Kayseri / Türkiye.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Ultra-fast Global Edge & AI Search Optimized</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Schema.org Modal */}
      {showAiModal && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-xl bg-black/75 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowAiModal(false)}
        >
          <div
            className="liquid-glass-elevated backdrop-blur-2xl bg-white/95 dark:bg-[#141418]/95 text-stone-900 dark:text-white p-6 sm:p-8 rounded-3xl max-w-xl w-full border border-stone-200/80 dark:border-white/10 space-y-4 shadow-2xl animate-modal-zoom"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-stone-200/70 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <FileCode className="w-4 h-4" />
                <h4 className="font-semibold text-xs uppercase tracking-wider">Schema.org JSON-LD</h4>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white px-3 py-1 bg-stone-100 dark:bg-white/10 rounded-full cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
            <pre className="text-[11px] bg-stone-100/90 dark:bg-black/60 p-4 rounded-2xl text-emerald-700 dark:text-emerald-300 font-mono overflow-x-auto max-h-72 border border-stone-200/60 dark:border-white/5">
{`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MakeMattress",
  "url": "https://makemattress.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Anbar Mah. 54.Cad 17/A",
    "addressLocality": "Melikgazi",
    "addressRegion": "Kayseri",
    "addressCountry": "TR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-352-311-4619",
    "email": "info@makemattress.com"
  }
}`}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}

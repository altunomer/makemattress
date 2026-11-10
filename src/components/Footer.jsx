import React from 'react';
import { companyData } from '../data/initialData';
import { getTranslation } from '../data/translations';

export default function Footer({ onSecretAdminTrigger, onOpenPdfCatalog, activeLang = 'en' }) {
  const t = (key) => getTranslation(key, activeLang);

  return (
    <>
      <footer className="relative z-10 bg-[#FAF8F4] dark:bg-[#111114] text-stone-700 dark:text-stone-300 pt-10 pb-8 border-t border-stone-200/80 dark:border-white/[0.06] transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-stone-200/80 dark:border-stone-800/60">
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
              <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-[#8C7A58] dark:text-[#D4B37F]">
                {t('footer_nav')}
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
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
              <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-[#8C7A58] dark:text-[#D4B37F]">
                Components
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">Mattress Tapes & Ribbons</a></li>
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">PE Packaging Films</a></li>
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">Thermobonded Felts</a></li>
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">Hotmelt Adhesives</a></li>
                <li><a href="#products" className="hover:text-stone-900 dark:hover:text-white transition-colors">Zippered Mattress Covers</a></li>
              </ul>
            </div>

            {/* Export & Logistics */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-[#8C7A58] dark:text-[#D4B37F]">
                Export & Logistics
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A58] dark:bg-amber-400"></span>
                  <span>Mixed Container Consolidation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A58] dark:bg-amber-400"></span>
                  <span>FOB, CIF & CFR Incoterms</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A58] dark:bg-amber-400"></span>
                  <span>Single Unified Customs Clearance</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A58] dark:bg-amber-400"></span>
                  <span>Pre-Shipment Photo Reporting</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A58] dark:bg-amber-400"></span>
                  <span>European Quality Tested</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright with discreet secret admin trigger */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-700 dark:text-stone-300 font-medium">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <span
                onClick={onSecretAdminTrigger}
                className="cursor-pointer hover:text-stone-900 dark:hover:text-white transition-colors font-bold"
                title="MakeMattress B2B"
              >
                MakeMattress
              </span>
              . All rights reserved. Kayseri / Türkiye.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Direct Multimodal Exports from Kayseri to 35+ Countries</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

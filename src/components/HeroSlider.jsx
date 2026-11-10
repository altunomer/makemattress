import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, FileText } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function HeroSlider({ slides, activeLang = 'en', onOpenPdfCatalog }) {
  const activeSlides = slides.filter(s => s.active);
  const [current, setCurrent] = useState(0);
  const t = (key) => getTranslation(key, activeLang);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % activeSlides.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  if (!activeSlides.length) return null;
  const slide = activeSlides[current] || activeSlides[0];

  // Retrieve fully localized slide values across all 14 languages
  const slideTitle = t(`slide_${slide.id}_title`) !== `slide_${slide.id}_title` ? t(`slide_${slide.id}_title`) : slide.title;
  const slideSubtitle = t(`slide_${slide.id}_subtitle`) !== `slide_${slide.id}_subtitle` ? t(`slide_${slide.id}_subtitle`) : slide.subtitle;
  const slideBtn = t(`slide_${slide.id}_btn`) !== `slide_${slide.id}_btn` ? t(`slide_${slide.id}_btn`) : slide.buttonText;

  return (
    <section className="relative w-full pt-19 sm:pt-22 pb-2 transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Clockwork Asymmetric Split Showcase Grid: 25% Left CTA Column + 75% Right Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          
          {/* LEFT COLUMN (~25% width on desktop): Distilled Single Architectural Column */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-between bg-white/60 dark:bg-[#121216]/60 border border-stone-200/70 dark:border-white/[0.07] rounded-2xl p-4 sm:p-5 divide-y divide-stone-200/70 dark:divide-white/[0.06]">
            {/* 1. Core Thesis Statement */}
            <div className="pb-5">
              <p className="text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200 font-normal">
                {t('pillars_subtitle')}
              </p>
            </div>

            {/* 2. Inline Trust Metrics (Zero inner boxes) */}
            <div className="py-5 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 leading-none">
                  10+
                </span>
                <span className="block text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-snug">
                  {t('qc_stat_exp')}
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 leading-none">
                  35+
                </span>
                <span className="block text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-snug">
                  {t('qc_stat_countries')}
                </span>
              </div>
            </div>

            {/* 3. Clean Action Links */}
            <div className="pt-5 space-y-3">
              {onOpenPdfCatalog && (
                <button
                  type="button"
                  onClick={onOpenPdfCatalog}
                  className="w-full text-left py-2 flex items-center justify-between gap-2 text-stone-900 dark:text-stone-100 hover:text-[#8C7A58] dark:hover:text-[#D4B37F] transition-colors cursor-pointer group"
                >
                  <div>
                    <span className="block text-[11px] text-stone-500 dark:text-stone-400">
                      {t('pdf_catalog_button')}
                    </span>
                    <span className="block text-sm font-semibold leading-snug">
                      {t('pdf_catalog_hero_btn')}
                    </span>
                  </div>
                  <FileText className="w-4 h-4 shrink-0 text-[#8C7A58] dark:text-[#D4B37F] opacity-80" />
                </button>
              )}

              <a
                href="#contact"
                className="w-full text-left py-2 flex items-center justify-between gap-2 text-stone-900 dark:text-stone-100 hover:text-[#8C7A58] dark:hover:text-[#D4B37F] transition-colors cursor-pointer group border-t border-stone-200/60 dark:border-white/[0.06] pt-3"
              >
                <div>
                  <span className="block text-[11px] text-stone-500 dark:text-stone-400">
                    {t('nav_contact')}
                  </span>
                  <span className="block text-sm font-semibold leading-snug">
                    {t('rfq_title')}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 text-[#8C7A58] dark:text-[#D4B37F] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN (~75% width on desktop): Framed Feature Carousel */}
          <div className="lg:col-span-9 order-1 lg:order-2 relative rounded-2xl overflow-hidden border border-stone-200/80 dark:border-white/10 min-h-[320px] sm:min-h-[380px] lg:min-h-[430px] flex items-end bg-[#EAE6DF] dark:bg-[#121216]">
            {/* Background Slides */}
            {activeSlides.map((s, idx) => (
              <div
                key={s.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding={idx === 0 ? "sync" : "async"}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"></div>
              </div>
            ))}

            {/* Bottom-Left Slide Title & Action */}
            <div className="relative z-10 p-5 sm:p-8 max-w-2xl w-full">
              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light leading-[1.1] tracking-tight text-white">
                {slideTitle}
              </h1>
              <p className="text-xs sm:text-sm text-stone-200/90 font-light leading-relaxed max-w-xl mt-2 line-clamp-2 sm:line-clamp-none">
                {slideSubtitle}
              </p>
              <div className="pt-4">
                <a
                  href={slide.link || "#products"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF8F4]/95 hover:bg-white text-stone-900 text-xs uppercase tracking-widest font-semibold rounded-full transition-colors cursor-pointer"
                >
                  <span>{slideBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C7A58]" />
                </a>
              </div>
            </div>

            {/* Bottom-Right Slider Controls */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 backdrop-blur-xl bg-black/50 border border-white/15 px-3 py-1.5 rounded-full">
              <div className="flex items-center gap-1">
                {activeSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className="relative p-2 flex items-center justify-center cursor-pointer min-w-[32px] min-h-[32px]"
                    aria-label={`Slide ${idx + 1}`}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-300 block ${
                        idx === current ? 'w-6 bg-[#D4B37F]' : 'w-1.5 bg-white/40 hover:bg-white/75'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 pl-2 border-l border-white/15">
                <button
                  onClick={() => setCurrent(prev => (prev - 1 + activeSlides.length) % activeSlides.length)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrent(prev => (prev + 1) % activeSlides.length)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

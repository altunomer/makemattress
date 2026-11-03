import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function HeroSlider({ slides, activeLang = 'en' }) {
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
  const slideTagline = t(`slide_${slide.id}_tagline`) !== `slide_${slide.id}_tagline` ? t(`slide_${slide.id}_tagline`) : slide.tagline;
  const slideTitle = t(`slide_${slide.id}_title`) !== `slide_${slide.id}_title` ? t(`slide_${slide.id}_title`) : slide.title;
  const slideSubtitle = t(`slide_${slide.id}_subtitle`) !== `slide_${slide.id}_subtitle` ? t(`slide_${slide.id}_subtitle`) : slide.subtitle;
  const slideBtn = t(`slide_${slide.id}_btn`) !== `slide_${slide.id}_btn` ? t(`slide_${slide.id}_btn`) : slide.buttonText;
  const slideBtn2 = t(`slide_${slide.id}_btn2`) !== `slide_${slide.id}_btn2` ? t(`slide_${slide.id}_btn2`) : (slide.secondaryButtonText || t('rfq_title'));

  return (
    <section className="relative w-full min-h-[580px] md:h-[660px] bg-[#EAE6DF] dark:bg-[#0A0A0D] text-stone-900 dark:text-white overflow-hidden flex items-center transition-colors duration-500">
      {/* Background Slides with cinematic smooth crossfade and subtle zoom */}
      {activeSlides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            idx === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
          />
          {/* Subtle liquid glass bottom transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 dark:from-[#0C0C0F]/70 dark:via-transparent dark:to-black/20"></div>
        </div>
      ))}

      {/* Floating Refractive Glow Orbs behind content */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-amber-500/15 dark:bg-amber-500/10 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#8C7A58]/15 dark:bg-stone-400/10 blur-[80px]"></div>
      </div>

      {/* Liquid Glass Hero Card Container (Offset for fixed floating navbar) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
        <div className="max-w-2xl backdrop-blur-2xl bg-white/80 dark:bg-white/[0.04] border border-white/70 dark:border-white/[0.12] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(28,25,23,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-6 animate-fade-in relative overflow-hidden group transition-all duration-300">
          {/* Subtle Top Glass Specular Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent"></div>

          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-stone-100/90 dark:bg-white/[0.08] border border-stone-200/80 dark:border-white/15 text-[#8C7A58] dark:text-[#E8CA9B] text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.25em] shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#8C7A58] dark:text-amber-300" />
            <span>{slideTagline}</span>
          </div>

          {/* Minimalist Serif Title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-tight text-stone-900 dark:text-white drop-shadow-xs">
            {slideTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-stone-700 dark:text-stone-300 font-light leading-relaxed max-w-xl">
            {slideSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={slide.link || "#products"}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-gradient-to-r dark:from-[#FAF8F4] dark:to-white dark:hover:from-white dark:hover:to-white dark:text-[#191816] text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-lg hover:-translate-y-0.5 group/btn cursor-pointer"
            >
              <span>{slideBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C4A46D] dark:text-[#9E8255] group-hover/btn:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full backdrop-blur-md bg-stone-900/5 hover:bg-stone-900/10 text-stone-800 border border-stone-300/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:border-white/20 dark:text-white text-xs uppercase tracking-widest font-medium transition-all cursor-pointer"
            >
              <span>{slideBtn2}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Glass Slider Controls (Bottom Right - positioned above overlapping cards) */}
      <div className="absolute bottom-10 sm:bottom-12 md:bottom-14 right-6 sm:right-10 z-20 flex items-center gap-4 backdrop-blur-xl bg-white/75 dark:bg-black/40 border border-stone-200/80 dark:border-white/10 px-4 py-2 rounded-full shadow-lg">
        {/* Progress indicators */}
        <div className="flex items-center gap-2">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === current ? 'w-7 bg-[#8C7A58] dark:bg-amber-300' : 'w-2 bg-stone-400/40 dark:bg-white/30 hover:bg-stone-400/70 dark:hover:bg-white/60'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Minimal Arrow Buttons */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-stone-300/80 dark:border-white/10">
          <button
            onClick={() => setCurrent(prev => (prev - 1 + activeSlides.length) % activeSlides.length)}
            className="w-7 h-7 rounded-full bg-stone-200/70 dark:bg-white/5 hover:bg-stone-300/70 dark:hover:bg-white/20 border border-stone-300/80 dark:border-white/10 flex items-center justify-center text-stone-700 dark:text-white transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrent(prev => (prev + 1) % activeSlides.length)}
            className="w-7 h-7 rounded-full bg-stone-200/70 dark:bg-white/5 hover:bg-stone-300/70 dark:hover:bg-white/20 border border-stone-300/80 dark:border-white/10 flex items-center justify-center text-stone-700 dark:text-white transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

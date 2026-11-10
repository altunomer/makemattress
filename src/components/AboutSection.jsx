import React from 'react';
import { Factory, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function AboutSection({ activeLang = 'en' }) {
  const t = (key) => getTranslation(key, activeLang);

  return (
    <section id="about" className="py-12 sm:py-16 relative z-10 border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Images Column */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200/80 dark:border-white/10">
              <img
                src="/images/about-foreign-trade.jpg"
                alt="MakeMattress Global Foreign Trade & Container Shipping"
                className="w-full h-[420px] sm:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Grounded Location Caption Card */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-5 sm:-right-5 backdrop-blur-xl bg-white/95 dark:bg-[#121216]/95 border border-stone-200/80 dark:border-white/10 p-4 rounded-2xl shadow-md max-w-[260px]">
              <div className="flex items-center gap-2 text-[#8C7A58] dark:text-[#D4B37F] mb-1">
                <Factory className="w-4 h-4" />
                <span className="text-[11px] uppercase font-semibold tracking-wider">{t('about_hub_badge')}</span>
              </div>
              <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                Kayseri / TÜRKİYE
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                {t('about_hub_desc')}
              </p>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              {t('about_title')}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              <p className="text-base font-normal text-stone-900 dark:text-stone-100">
                {t('about_p1')}
              </p>
              <p>
                {t('about_p2')}
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F] shrink-0" />
                <span>{t('about_check1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F] shrink-0" />
                <span>{t('about_check2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F] shrink-0" />
                <span>{t('about_check3')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F] shrink-0" />
                <span>{t('about_check4')}</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-[#D4B37F] hover:bg-stone-800 dark:hover:bg-[#E2C79D] text-white dark:text-stone-950 text-xs uppercase tracking-widest font-semibold rounded-full transition-colors shadow-xs cursor-pointer"
              >
                <span>{t('about_cta')}</span>
                <ArrowRight className="w-4 h-4 text-[#C4A46D] dark:text-stone-900" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

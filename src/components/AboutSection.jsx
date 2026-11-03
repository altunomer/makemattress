import React from 'react';
import { Factory, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function AboutSection({ activeLang = 'en' }) {
  const t = (key) => getTranslation(key, activeLang);

  return (
    <section id="about" className="py-24 relative z-10 border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Images Column */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-white/10 group">
              <img
                src="/images/about-foreign-trade.jpg"
                alt="MakeMattress Global Foreign Trade & Container Shipping"
                className="w-full h-[460px] object-cover group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
            </div>

            {/* Overlapping Floating Liquid Glass Badge */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 liquid-glass-elevated p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] max-w-[260px] animate-float">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1.5">
                <div className="p-1 rounded-md bg-emerald-500/10">
                  <Factory className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider">{t('about_hub_badge')}</span>
              </div>
              <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                Kayseri / TÜRKİYE
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                {t('about_hub_desc')}
              </p>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-stone-200/50 dark:bg-white/[0.06] border border-stone-300/60 dark:border-white/10 text-[#8C7A58] dark:text-[#D4B37F] text-[10px] uppercase font-bold tracking-[0.25em]">
              <Sparkles className="w-3 h-3" />
              <span>{t('about_badge')}</span>
            </div>

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

            <div className="pt-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 dark:bg-[#D4B37F] hover:bg-stone-800 dark:hover:bg-[#E8CA9B] text-white dark:text-stone-950 text-xs uppercase tracking-widest font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
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

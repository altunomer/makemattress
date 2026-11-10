import React from 'react';
import { ShieldCheck, PackageCheck, Eye } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function QualityControlSection({ activeLang = 'en' }) {
  const t = (key) => getTranslation(key, activeLang);

  const steps = [
    {
      icon: Eye,
      title: t('qc_step1_title'),
      desc: t('qc_step1_desc')
    },
    {
      icon: PackageCheck,
      title: t('qc_step2_title'),
      desc: t('qc_step2_desc')
    },
    {
      icon: ShieldCheck,
      title: t('qc_step3_title'),
      desc: t('qc_step3_desc')
    }
  ];

  return (
    <section id="quality" className="py-12 sm:py-16 relative z-10 border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              {t('qc_title')}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              <p>
                {t('qc_subtitle')}
              </p>
              <p>
                {t('qc_philosophy')}
              </p>
            </div>

            {/* Metric counters */}
            <div className="pt-4 flex items-center gap-6 sm:gap-8">
              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-semibold text-[#8C7A58] dark:text-[#D4B37F]">10+</span>
                <span className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium">{t('qc_stat_exp')}</span>
              </div>
              <div className="h-10 w-[1px] bg-stone-200 dark:bg-white/10"></div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-semibold text-[#8C7A58] dark:text-[#D4B37F]">35+</span>
                <span className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium">{t('qc_stat_countries')}</span>
              </div>
              <div className="h-10 w-[1px] bg-stone-200 dark:bg-white/10"></div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-semibold text-[#8C7A58] dark:text-[#D4B37F]">100%</span>
                <span className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium">{t('qc_stat_inspected')}</span>
              </div>
            </div>
          </div>

          {/* Right Protocol Steps (Unboxed Typographic Rows) */}
          <div className="lg:col-span-6 divide-y divide-stone-200/70 dark:divide-white/[0.06] border-t border-b border-stone-200/70 dark:border-white/[0.06]">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="py-5 flex items-start gap-4"
                >
                  <Icon className="w-5 h-5 text-[#8C7A58] dark:text-[#D4B37F] shrink-0 mt-0.5 stroke-[1.75]" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

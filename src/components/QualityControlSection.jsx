import React from 'react';
import { ShieldCheck, CheckCircle2, Sliders, PackageCheck, Eye, Award, Sparkles } from 'lucide-react';
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
    <section id="quality" className="py-24 relative z-10 border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-[#8C7A58] dark:text-[#D4B37F] text-[11px] font-bold uppercase tracking-widest shadow-inner">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('qc_badge')}</span>
            </div>

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
            <div className="pt-4 flex items-center gap-6">
              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-bold text-[#8C7A58] dark:text-[#D4B37F]">10+</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold">{t('qc_stat_exp')}</span>
              </div>
              <div className="h-10 w-[1px] bg-stone-300 dark:bg-white/10"></div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-bold text-[#8C7A58] dark:text-[#D4B37F]">35+</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold">{t('qc_stat_countries')}</span>
              </div>
              <div className="h-10 w-[1px] bg-stone-300 dark:bg-white/10"></div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-bold text-[#8C7A58] dark:text-[#D4B37F]">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold">{t('qc_stat_inspected')}</span>
              </div>
            </div>
          </div>

          {/* Right Protocol Cards */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="liquid-glass p-5 rounded-2xl flex items-start gap-4 hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl backdrop-blur-md bg-stone-100/90 dark:bg-white/[0.08] text-[#8C7A58] dark:text-[#D4B37F] border border-stone-200/80 dark:border-white/10 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
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

import React from 'react';
import { Box, ShieldCheck, Layers, Globe2, Sparkles } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function ValuePillars({ activeLang = 'en' }) {
  const t = (key) => getTranslation(key, activeLang);

  const pillars = [
    {
      icon: Layers,
      title: t('pillar_1_title'),
      desc: t('pillar_1_desc'),
      gradient: "from-amber-600/15 to-stone-500/10"
    },
    {
      icon: Box,
      title: t('pillar_2_title'),
      desc: t('pillar_2_desc'),
      gradient: "from-stone-600/20 to-stone-800/10"
    },
    {
      icon: ShieldCheck,
      title: t('pillar_3_title'),
      desc: t('pillar_3_desc'),
      gradient: "from-emerald-600/15 to-stone-600/10"
    },
    {
      icon: Globe2,
      title: t('pillar_4_title'),
      desc: t('pillar_4_desc'),
      gradient: "from-amber-500/20 to-stone-700/10"
    }
  ];

  return (
    <section id="advantage" className="relative z-20 py-10 sm:py-12 border-t border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
        
        {/* Clean Open Section Header */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 font-medium tracking-tight">
            {t('pillars_title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl mt-1.5 leading-relaxed">
            {t('pillars_subtitle')}
          </p>
        </div>

        {/* Unboxed Clean 4-Column Architectural Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="pt-5 border-t border-stone-200 dark:border-white/[0.08] space-y-3"
              >
                <Icon className="w-5 h-5 text-[#8C7A58] dark:text-[#D4B37F] stroke-[1.75]" />
                <div className="space-y-1.5">
                  <strong className="text-sm font-semibold text-stone-900 dark:text-stone-100 block">
                    {p.title}
                  </strong>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

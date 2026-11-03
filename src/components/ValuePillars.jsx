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
      gradient: "from-blue-500/20 to-cyan-500/10"
    },
    {
      icon: Box,
      title: t('pillar_2_title'),
      desc: t('pillar_2_desc'),
      gradient: "from-amber-500/20 to-orange-500/10"
    },
    {
      icon: ShieldCheck,
      title: t('pillar_3_title'),
      desc: t('pillar_3_desc'),
      gradient: "from-emerald-500/20 to-teal-500/10"
    },
    {
      icon: Globe2,
      title: t('pillar_4_title'),
      desc: t('pillar_4_desc'),
      gradient: "from-violet-500/20 to-purple-500/10"
    }
  ];

  return (
    <section className="relative z-20 pb-14 sm:pb-18 border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Pillar Liquid Glass Grid - Floating & Overlapping the Slider by ~10% */}
        <div className="-mt-5 sm:-mt-6 md:-mt-8 relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="liquid-glass group p-5 sm:p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-400 ease-out hover:-translate-y-1.5 shadow-[0_16px_36px_rgba(28,25,23,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-amber-500/40 dark:hover:border-amber-400/30 backdrop-blur-2xl bg-white/95 dark:bg-[#121216]/95 border border-white/80 dark:border-white/10"
              >
                {/* Dynamic Specular Shimmer Top Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent group-hover:via-amber-400/80 transition-all duration-500"></div>

                {/* Subtle Ambient Hover Glow */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${p.gradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                <div className="space-y-3.5 relative z-10">
                  {/* Glass Icon Capsule */}
                  <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-stone-100/90 dark:bg-white/[0.08] border border-stone-200/90 dark:border-white/10 flex items-center justify-center text-[#8C7A58] dark:text-[#D4B37F] group-hover:bg-[#8C7A58] group-hover:text-white dark:group-hover:bg-[#D4B37F] dark:group-hover:text-stone-950 transition-all duration-300 shadow-xs">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 tracking-wide uppercase">
                      {p.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Active Glass Accent Bar */}
                <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7A58] dark:text-amber-400">MakeMattress QA</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 group-hover:bg-amber-500 transition-colors"></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Header / Value Story below the floating cards */}
        <div className="max-w-2xl mx-auto text-center space-y-2 mt-12 sm:mt-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-stone-200/50 dark:bg-white/[0.06] border border-stone-300/60 dark:border-white/10 text-[#8C7A58] dark:text-[#D4B37F] text-[10px] uppercase font-bold tracking-[0.25em]">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>{t('pillars_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-stone-900 dark:text-stone-100 font-bold tracking-tight">
            {t('pillars_title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
            {t('pillars_subtitle')}
          </p>
          <div className="w-10 h-0.5 bg-gradient-to-r from-[#8C7A58] to-[#C4A46D] dark:from-[#D4B37F] dark:to-[#E8CA9B] mx-auto rounded-full"></div>
        </div>

      </div>
    </section>
  );
}

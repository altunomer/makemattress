import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function NewsletterSection({ activeLang = 'en' }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = (key) => getTranslation(key, activeLang);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 relative z-10 border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="liquid-glass-elevated p-8 sm:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden shadow-xl">
          {/* Top Specular Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent"></div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-stone-100 dark:bg-white/[0.06] text-[#8C7A58] dark:text-[#D4B37F] text-[10px] font-bold uppercase tracking-widest border border-stone-200/80 dark:border-white/10 shadow-inner">
            <Mail className="w-3.5 h-3.5" />
            <span>Industry Intelligence</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
            {t('news_title')}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            {t('news_subtitle')}
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl backdrop-blur-md bg-emerald-500/10 border border-emerald-500/20 max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-300 animate-fade-in shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Thank you for subscribing to MakeMattress B2B Market Insights.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('news_placeholder')}
                className="flex-1 px-4 py-3 rounded-full backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.05] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-stone-900 dark:bg-[#D4B37F] hover:bg-stone-800 dark:hover:bg-[#E8CA9B] text-white dark:text-stone-950 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0"
              >
                <span>{t('news_button')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C4A46D] dark:text-stone-900" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-stone-400 dark:text-stone-500">
            Zero spam. Only relevant supply chain news. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

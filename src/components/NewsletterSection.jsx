import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
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
    <section className="py-10 sm:py-12 relative z-10 border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="bg-white/85 dark:bg-[#121216]/85 border border-stone-200/80 dark:border-white/[0.08] p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto text-center space-y-4 relative overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
            {t('news_title')}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            {t('news_subtitle')}
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-300 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Thank you for subscribing to MakeMattress B2B Market Insights.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('news_placeholder')}
                className="flex-1 px-4 py-3 rounded-full bg-stone-50/80 dark:bg-white/[0.05] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-stone-900 dark:bg-[#D4B37F] hover:bg-stone-800 dark:hover:bg-[#E2C79D] text-white dark:text-stone-950 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer shrink-0"
              >
                <span>{t('news_button')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C4A46D] dark:text-stone-900" />
              </button>
            </form>
          )}

          <p className="text-xs text-stone-500 dark:text-stone-400 font-normal">
            Zero spam. Only relevant supply chain news. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

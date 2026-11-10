import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import FlagIcon from './FlagIcon';
import {
  detectUserLanguage,
  isSearchEngineBot,
  hasUserDecidedLanguage,
  saveLanguageDecision,
  dismissLanguagePrompt
} from '../utils/geoLanguageDetector';

/**
 * Localized messages for the detected language:
 * All modal texts (title, question, switch button) are presented in the visitor's detected native language.
 */
const LOCALIZED_MESSAGES = {
  tr: {
    detectedTitle: 'Diliniz Türkçe Olarak Tespit Edildi',
    question: 'MakeMattress sitemizi Türkçe olarak incelemek ister misiniz?',
    switchBtn: 'Türkçe Diline Geç'
  },
  de: {
    detectedTitle: 'Ihre Sprache wurde als Deutsch erkannt',
    question: 'Möchten Sie MakeMattress auf Deutsch ansehen?',
    switchBtn: 'Zu Deutsch wechseln'
  },
  fr: {
    detectedTitle: 'Votre langue a été détectée comme Français',
    question: 'Souhaitez-vous consulter MakeMattress en français ?',
    switchBtn: 'Passer au Français'
  },
  es: {
    detectedTitle: 'Su idioma se ha detectado como Español',
    question: '¿Desea explorar MakeMattress en español?',
    switchBtn: 'Cambiar a Español'
  },
  it: {
    detectedTitle: 'La tua lingua è stata rilevata come Italiano',
    question: 'Vuoi visualizzare MakeMattress in italiano?',
    switchBtn: 'Passa all\'Italiano'
  },
  pt: {
    detectedTitle: 'Seu idioma foi detectado como Português',
    question: 'Deseja navegar no MakeMattress em português?',
    switchBtn: 'Mudar para Português'
  },
  nl: {
    detectedTitle: 'Uw taal is gedetecteerd als Nederlands',
    question: 'Wilt u MakeMattress in het Nederlands bekijken?',
    switchBtn: 'Naar het Nederlands'
  },
  pl: {
    detectedTitle: 'Twój język został wykryty jako Polski',
    question: 'Czy chcesz przeglądać MakeMattress w języku polskim?',
    switchBtn: 'Przełącz na Polski'
  },
  ru: {
    detectedTitle: 'Ваш язык определен как Русский',
    question: 'Хотите просматривать MakeMattress на русском языке?',
    switchBtn: 'Перейти на Русский'
  },
  ar: {
    detectedTitle: 'تم اكتشاف لغتك كالعربية',
    question: 'هل ترغب في تصفح MakeMattress باللغة العربية؟',
    switchBtn: 'التبديل إلى العربية'
  },
  zh: {
    detectedTitle: '检测到您的语言为中文',
    question: '您想以中文浏览 MakeMattress 吗？',
    switchBtn: '切换至中文'
  },
  ka: {
    detectedTitle: 'თქვენი ენა დაფიქსირდა როგორც ქართული',
    question: 'გსურთ დაათვალიეროთ MakeMattress ქართულად?',
    switchBtn: 'ქართულზე გადასვლა'
  },
  ga: {
    detectedTitle: 'Braitheadh do theanga mar Ghaeilge',
    question: 'Ar mhaith leat MakeMattress a bhrabhsáil i nGaeilge?',
    switchBtn: 'Athraigh go Gaeilge'
  },
  en: {
    detectedTitle: 'Your Language Was Detected as English',
    question: 'Would you like to browse MakeMattress in English?',
    switchBtn: 'Switch to English'
  }
};

/**
 * "Stay in current language" button text:
 * Must be written strictly in the CURRENT active language of the site.
 */
const STAY_BUTTON_TEXT = {
  en: 'Stay in English',
  tr: 'Türkçe Olarak Kal',
  de: 'Auf Deutsch bleiben',
  fr: 'Rester en Français',
  es: 'Mantener en Español',
  it: 'Rimani in Italiano',
  pt: 'Continuar em Português',
  nl: 'In het Nederlands blijven',
  pl: 'Zostań przy polskim',
  ru: 'Остаться на русском',
  ar: 'البقاء باللغة العربية',
  zh: '保持中文',
  ka: 'ქართულად დარჩენა',
  ga: 'Fan i nGaeilge'
};

export default function LanguageSuggestionModal({
  activeLang,
  onSwitchLanguage
}) {
  const [visible, setVisible] = useState(false);
  const [detectedLang, setDetectedLang] = useState(null);

  useEffect(() => {
    // 1. Immediately bypass bots and crawlers for 100% SEO safety
    if (isSearchEngineBot()) return;

    // 2. Check if user has already made a decision or dismissed
    if (hasUserDecidedLanguage()) return;

    // 3. Detect user language
    const detected = detectUserLanguage();
    if (!detected || detected === activeLang) {
      // User is already browsing in their detected language
      return;
    }

    setDetectedLang(detected);

    // 4. Delay modal appearance by 2.8 seconds so initial page paint & crawlers are unaffected
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, [activeLang]);

  // Close on Escape key
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dismissLanguagePrompt();
        setVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  if (!visible || !detectedLang || detectedLang === activeLang) {
    return null;
  }

  const msg = LOCALIZED_MESSAGES[detectedLang] || LOCALIZED_MESSAGES.en;
  const stayBtnText = STAY_BUTTON_TEXT[activeLang] || STAY_BUTTON_TEXT.en;

  const handleSwitch = () => {
    saveLanguageDecision('switched', detectedLang);
    setVisible(false);
    onSwitchLanguage(detectedLang);
  };

  const handleStay = () => {
    saveLanguageDecision('stay', activeLang);
    setVisible(false);
  };

  const handleDismiss = () => {
    dismissLanguagePrompt();
    setVisible(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 dark:bg-black/65 transition-opacity duration-200"
      onClick={handleDismiss}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#FAF8F4] dark:bg-[#141418] border border-stone-200 dark:border-white/15 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Top Header: Flag Icon of Detected Language & Close Button */}
        <div className="flex items-center justify-between pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-white/5 border border-amber-500/25 dark:border-white/10 flex items-center justify-center shadow-xs">
            <FlagIcon code={detectedLang} className="w-7 h-5 rounded-xs shadow-xs object-cover" />
          </div>

          <button
            onClick={handleDismiss}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Kapat / Close"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body: Presented in the Detected Language */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-stone-900 dark:text-white leading-snug">
            {msg.detectedTitle}
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            {msg.question}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Primary Action: Switch to detected language (written in detected language) */}
          <button
            onClick={handleSwitch}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <FlagIcon code={detectedLang} className="w-4 h-3 rounded-2xs object-cover" />
            <span>{msg.switchBtn}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Secondary Action: Stay in current language (written in current active language!) */}
          <button
            onClick={handleStay}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-700 dark:text-stone-300 text-xs font-semibold border border-stone-200/80 dark:border-white/10 transition-colors cursor-pointer"
          >
            <FlagIcon code={activeLang} className="w-4 h-3 rounded-2xs object-cover" />
            <span className="whitespace-nowrap">
              {stayBtnText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

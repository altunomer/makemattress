/**
 * Geo / Browser Region Language Detector for MakeMattress
 * 
 * Accurately detects visitor's region and preferred language while:
 * 1. Protecting SEO and search engine bots (Googlebot, Bingbot, etc. are completely ignored).
 * 2. Delaying execution by 2.5 - 3.5s to prevent initial paint blockage or layout shifts.
 * 3. Never auto-redirecting forcefully; provides a polite, non-intrusive suggestion modal/toast.
 */

const STORAGE_KEY_DECISION = 'makemattress_lang_decision';
const STORAGE_KEY_DISMISSED = 'makemattress_lang_dismissed';

export const SUPPORTED_LANG_CODES = [
  'en', 'tr', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'ka', 'ga', 'ru', 'ar', 'zh'
];

/**
 * Checks if current user-agent is a search engine bot, crawler, or headless browser.
 */
export function isSearchEngineBot() {
  if (typeof window === 'undefined' || !navigator) return false;
  const ua = navigator.userAgent || '';
  return /bot|googlebot|crawler|spider|robot|crawling|bingbot|yandex|duckduckbot|slurp|baiduspider|headlesschrome|lighthouse|insights/i.test(ua);
}

/**
 * Maps timezone prefixes to supported language codes
 */
const TIMEZONE_LANG_MAP = {
  'Europe/Istanbul': 'tr',
  'Asia/Istanbul': 'tr',
  'Europe/Berlin': 'de',
  'Europe/Vienna': 'de',
  'Europe/Zurich': 'de',
  'Europe/Paris': 'fr',
  'Europe/Brussels': 'fr',
  'Europe/Madrid': 'es',
  'Europe/Rome': 'it',
  'Europe/Amsterdam': 'nl',
  'Europe/Warsaw': 'pl',
  'Europe/Moscow': 'ru',
  'Asia/Tbilisi': 'ka',
  'Europe/Dublin': 'ga',
  'Asia/Riyadh': 'ar',
  'Asia/Dubai': 'ar',
  'Africa/Cairo': 'ar',
  'Asia/Shanghai': 'zh',
  'Asia/Hong_Kong': 'zh',
  'Asia/Taipei': 'zh',
  'Europe/London': 'en'
};

/**
 * Detects visitor's preferred language from browser languages and timezone.
 * Returns null if visitor is a bot or no distinct supported language is found.
 */
export function detectUserLanguage() {
  if (isSearchEngineBot()) return null;
  if (typeof window === 'undefined' || !navigator) return null;

  // 1. Check navigator.languages list
  const navLangs = navigator.languages || [navigator.language || navigator.userLanguage];
  for (const raw of navLangs) {
    if (!raw) continue;
    const sub = raw.split('-')[0].toLowerCase();
    if (SUPPORTED_LANG_CODES.includes(sub)) {
      return sub;
    }
  }

  // 2. Fallback to Timezone inference
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_LANG_MAP[tz]) {
      return TIMEZONE_LANG_MAP[tz];
    }
  } catch (e) {}

  return null;
}

/**
 * Has the user already made a language choice or dismissed the prompt?
 */
export function hasUserDecidedLanguage() {
  if (typeof window === 'undefined') return true;
  try {
    const decision = localStorage.getItem(STORAGE_KEY_DECISION);
    const dismissed = sessionStorage.getItem(STORAGE_KEY_DISMISSED);
    return Boolean(decision || dismissed);
  } catch (e) {
    return false;
  }
}

/**
 * Save user language choice (e.g. "stay" or "switch") so we don't badger them repeatedly.
 */
export function saveLanguageDecision(choice, langCode) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_DECISION, JSON.stringify({
      choice, // 'stay' | 'switched'
      lang: langCode,
      timestamp: Date.now()
    }));
  } catch (e) {}
}

/**
 * Dismiss for the current browsing session
 */
export function dismissLanguagePrompt() {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY_DISMISSED, 'true');
  } catch (e) {}
}

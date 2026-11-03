import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Box, Sun, Moon, Globe } from 'lucide-react';
import { availableLanguages } from '../data/initialData';
import { getTranslation } from '../data/translations';
import FlagIcon from './FlagIcon';

export default function Header({
  activeLang,
  setActiveLang,
  cartCount,
  onOpenContainerDrawer,
  theme,
  toggleTheme,
  onOpenPdfCatalog
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langDropdownRef = useRef(null);

  // Lock body scroll when full-screen mobile menu overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Dynamic scroll listener: detects when user scrolls away from the very top
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLangDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [langDropdownOpen]);

  const currentLangObj = availableLanguages.find(l => l.code === activeLang) || availableLanguages[0];
  const t = (key) => getTranslation(key, activeLang);

  return (
    <header
      className={`fixed left-0 right-0 z-50 w-full px-3 sm:px-6 pointer-events-none transition-all duration-500 ease-out ${
        isScrolled ? 'top-2 sm:top-3' : 'top-4 sm:top-6'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto relative flex items-center transition-all duration-500 ease-out ${
          isScrolled ? 'h-11 sm:h-12' : 'h-14 sm:h-16'
        }`}
      >
        
        {/* ============================================================== */}
        {/* 1. LOGO CAPSULE (Centered & Larger at top, glides Left on scroll) */}
        {/* ============================================================== */}
        <div
          className={`absolute rounded-full backdrop-blur-xl bg-white/75 dark:bg-[#101014]/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center shrink-0 transition-all duration-500 ease-out pointer-events-auto z-30 ${
            isScrolled
              ? 'left-0 translate-x-0 h-11 sm:h-12 px-3 sm:px-4'
              : 'left-1/2 -translate-x-1/2 h-13 sm:h-16 px-4.5 sm:px-8 shadow-xl shadow-black/10 dark:shadow-black/60'
          }`}
        >
          <a href="#" className="flex items-center group relative">
            {/* Light Mode Logo (Original) */}
            <img
              src="/images/logo.png"
              alt="MakeMattress"
              className={`w-auto object-contain transition-all duration-500 ease-out dark:hidden group-hover:scale-[1.03] group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] ${
                isScrolled
                  ? 'h-5.5 sm:h-7'
                  : 'h-7.5 sm:h-10 md:h-11'
              }`}
            />
            {/* Dark Mode Logo (White Vector SVG with White Glow/Shadow) */}
            <img
              src="/images/logo-white.svg"
              alt="MakeMattress"
              className={`w-auto object-contain transition-all duration-500 ease-out hidden dark:block group-hover:scale-[1.03] group-hover:drop-shadow-[0_4px_14px_rgba(255,255,255,0.75)] ${
                isScrolled
                  ? 'h-5.5 sm:h-7'
                  : 'h-7.5 sm:h-10 md:h-11'
              }`}
            />
          </a>
        </div>

        {/* ============================================================== */}
        {/* 2. CENTER OVAL CAPSULE: DESKTOP NAVIGATION MENU (Borderless)   */}
        {/* ============================================================== */}
        <nav
          className={`hidden lg:flex absolute rounded-full backdrop-blur-xl bg-white/75 dark:bg-[#101014]/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] items-center whitespace-nowrap flex-nowrap shrink-0 transition-all duration-500 ease-out pointer-events-auto z-20 ${
            isScrolled
              ? 'left-1/2 -translate-x-1/2 h-11 sm:h-12 px-6 space-x-6 xl:space-x-8 text-[12px]'
              : 'left-0 translate-x-0 h-14 sm:h-16 px-5 xl:px-7 space-x-5 xl:space-x-7 text-[12px] xl:text-[13px]'
          } uppercase tracking-[0.16em] font-medium text-stone-700 dark:text-stone-300`}
        >
          <a
            href="#products"
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group shrink-0"
          >
            <span>{t('nav_products')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-900 dark:bg-amber-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#quality"
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group shrink-0"
          >
            <span>{t('nav_quality')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-900 dark:bg-amber-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#about"
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group shrink-0"
          >
            <span>{t('nav_about')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-900 dark:bg-amber-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#contact"
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group shrink-0"
          >
            <span>{t('nav_contact')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-900 dark:bg-amber-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        {/* ============================================================== */}
        {/* 3. RIGHT OVAL CAPSULE: LANGUAGE, CONTAINER, THEME & PDF BUTTON */}
        {/* ============================================================== */}
        <div
          className={`absolute right-0 rounded-full backdrop-blur-xl bg-white/75 dark:bg-[#101014]/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center gap-1.5 sm:gap-2.5 whitespace-nowrap flex-nowrap shrink-0 transition-all duration-500 ease-out pointer-events-auto z-30 ${
            isScrolled
              ? 'h-11 sm:h-12 px-2 sm:px-3'
              : 'h-13 sm:h-16 px-2.5 sm:px-4'
          }`}
        >
          
          {/* A. Language Switcher (Visible on desktop & tablet, also in mobile overlay) */}
          <div className="relative hidden sm:block" ref={langDropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 rounded-full backdrop-blur-sm bg-stone-100/90 dark:bg-white/[0.08] hover:bg-stone-200/90 dark:hover:bg-white/15 text-stone-800 dark:text-stone-200 text-xs font-medium transition-all duration-300 cursor-pointer shrink-0 ${
                isScrolled ? 'h-7.5 px-2.5' : 'h-8.5 px-3'
              }`}
              aria-label="Select language"
              title={currentLangObj.label}
            >
              <FlagIcon code={currentLangObj.code} className="w-4.5 h-3 rounded-xs object-cover shadow-xs" />
              <ChevronDown className="w-2.5 h-2.5 text-stone-600 dark:text-stone-300 transition-transform duration-200" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 max-h-84 overflow-y-auto dropdown-scrollbar backdrop-blur-2xl bg-white/95 dark:bg-[#141418]/95 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] py-2 z-50 animate-fade-in text-stone-800 dark:text-stone-200">
                <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-widest text-[#8C7A58] dark:text-amber-400 border-b border-stone-200/60 dark:border-white/10 mb-1 flex items-center justify-between">
                  <span>14 Global Languages</span>
                  <Globe className="w-3 h-3" />
                </div>
                {availableLanguages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setActiveLang(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                      activeLang === l.code
                        ? 'font-bold text-amber-600 dark:text-amber-300 bg-stone-100 dark:bg-white/10'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100/70 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <FlagIcon code={l.code} className="w-4.5 h-3 rounded-xs object-cover shadow-xs shrink-0" />
                      <span>{l.label}</span>
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase font-mono">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* B. Container Button with subtle container corrugated stripes (Borderless) */}
          <button
            onClick={onOpenContainerDrawer}
            className={`relative flex items-center gap-1.5 rounded-full backdrop-blur-sm bg-stone-100/90 dark:bg-white/[0.08] hover:bg-stone-200/90 dark:hover:bg-white/15 text-stone-800 dark:text-stone-100 font-medium transition-all duration-300 cursor-pointer group active:scale-95 shrink-0 overflow-hidden ${
              isScrolled ? 'h-7.5 px-2 sm:px-2.5 text-[11px]' : 'h-8 sm:h-8.5 px-2.5 sm:px-3 text-[11.5px]'
            }`}
            aria-label="Open container drawer"
            title={t('container_button')}
          >
            {/* Subtle shipping container vertical corrugated lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none flex justify-between px-1">
              <span className="w-[1px] h-full bg-stone-700 dark:bg-white"></span>
              <span className="w-[1px] h-full bg-stone-700 dark:bg-white"></span>
              <span className="w-[1px] h-full bg-stone-700 dark:bg-white"></span>
              <span className="w-[1px] h-full bg-stone-700 dark:bg-white"></span>
            </div>

            <Box className="w-3.5 h-3.5 text-[#8C7A58] dark:text-[#D4B37F] group-hover:rotate-6 transition-transform relative z-10" />
            <span className="hidden sm:inline font-medium relative z-10">{t('container_button')}</span>
            {cartCount > 0 && (
              <span className="bg-amber-500 text-stone-950 text-[9.5px] font-bold px-1.5 py-0.2 rounded-full leading-none shadow-xs relative z-10">
                {cartCount}
              </span>
            )}
          </button>

          {/* C. Modern Sliding Theme Switcher Toggle (Borderless) */}
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            onClick={toggleTheme}
            className={`rounded-full backdrop-blur-sm bg-stone-200/90 dark:bg-stone-800/90 p-0.5 relative cursor-pointer transition-all duration-300 flex items-center shadow-inner shrink-0 ${
              isScrolled ? 'w-12 sm:w-13 h-7' : 'w-13 sm:w-14 h-7.5 sm:h-8'
            }`}
            title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
            aria-label="Toggle light or dark theme"
          >
            <div className="w-full flex justify-between items-center px-1.5 pointer-events-none">
              <Sun className="w-3 h-3 text-amber-500" />
              <Moon className="w-3 h-3 text-stone-400" />
            </div>
            <div
              className={`absolute top-0.5 bottom-0.5 rounded-full bg-amber-400 dark:bg-stone-100 shadow-md flex items-center justify-center transition-transform duration-300 ease-out ${
                isScrolled ? 'w-6 h-6' : 'w-6.5 sm:w-7 h-6.5 sm:h-7'
              } ${
                theme === 'dark'
                  ? (isScrolled ? 'translate-x-5 sm:translate-x-6' : 'translate-x-5.5 sm:translate-x-6.5')
                  : 'translate-x-0'
              }`}
            >
              {theme === 'dark' ? (
                <Moon className="w-3 h-3 text-stone-950 fill-stone-950" />
              ) : (
                <Sun className="w-3 h-3 text-stone-950 fill-stone-950" />
              )}
            </div>
          </button>

          {/* D. Polite, Oval, Black PDF Catalog Button (Visible on desktop lg:, also in overlay) */}
          <button
            onClick={onOpenPdfCatalog}
            className={`hidden lg:inline-flex rounded-full bg-black hover:bg-stone-900 active:scale-95 text-white font-semibold tracking-wider uppercase shadow-sm transition-all duration-300 cursor-pointer shrink-0 ${
              isScrolled ? 'h-7.5 px-3.5 text-[11px]' : 'h-8.5 px-4.5 text-[11.5px]'
            }`}
            title={t('pdf_catalog_title')}
          >
            {t('pdf_catalog_button')}
          </button>

          {/* Mobile & Tablet Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>

      {/* Full-Screen Animated Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto dropdown-scrollbar backdrop-blur-3xl bg-[#FAF8F4]/98 dark:bg-[#0C0C0F]/98 flex flex-col justify-between p-6 sm:p-10 animate-fade-in pointer-events-auto text-stone-900 dark:text-white">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-200/70 dark:border-white/10">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center group">
              <img
                src="/images/logo.png"
                alt="MakeMattress"
                className="h-7 sm:h-8 w-auto object-contain dark:hidden group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] transition-all"
              />
              <img
                src="/images/logo-white.svg"
                alt="MakeMattress"
                className="h-7 sm:h-8 w-auto object-contain hidden dark:block group-hover:drop-shadow-[0_4px_14px_rgba(255,255,255,0.75)] transition-all"
              />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full backdrop-blur-md bg-stone-200/60 dark:bg-white/10 hover:bg-stone-300/80 dark:hover:bg-white/20 text-stone-800 dark:text-stone-200 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Navigation Links with Large Elegant Typography */}
          <div className="py-8 space-y-6 text-center sm:text-left max-w-md mx-auto sm:mx-0">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl sm:text-3xl font-light tracking-wide text-stone-900 hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400 transition-colors py-1.5"
            >
              <span>{t('nav_products')}</span>
            </a>
            <a
              href="#quality"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl sm:text-3xl font-light tracking-wide text-stone-900 hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400 transition-colors py-1.5"
            >
              <span>{t('nav_quality')}</span>
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl sm:text-3xl font-light tracking-wide text-stone-900 hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400 transition-colors py-1.5"
            >
              <span>{t('nav_about')}</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl sm:text-3xl font-light tracking-wide text-stone-900 hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400 transition-colors py-1.5"
            >
              <span>{t('nav_contact')}</span>
            </a>
          </div>

          {/* Bottom Controls: PDF Catalog, 14 Languages Selector, Theme Switcher */}
          <div className="pt-6 border-t border-stone-200/70 dark:border-white/10 space-y-5">
            {/* 3D PDF Catalog Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPdfCatalog();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-black hover:bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>{t('pdf_catalog_button')}</span>
            </button>

            {/* 14 Languages Selector in Overlay */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#8C7A58] dark:text-amber-400 mb-2.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Language / Dil Seçimi</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableLanguages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setActiveLang(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                      activeLang === l.code
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 font-bold border border-amber-500/30'
                        : 'bg-stone-100/80 dark:bg-white/[0.04] text-stone-700 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-white/10'
                    }`}
                  >
                    <FlagIcon code={l.code} className="w-4 h-3 rounded-xs object-cover shrink-0" />
                    <span className="truncate">{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Switcher in Overlay */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                {theme === 'dark' ? t('theme_dark') : t('theme_light')}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={theme === 'dark'}
                onClick={toggleTheme}
                className="w-13 h-7 rounded-full backdrop-blur-sm bg-stone-200/90 dark:bg-stone-800/90 p-0.5 relative cursor-pointer transition-colors duration-300 flex items-center shadow-inner"
              >
                <div className="w-full flex justify-between items-center px-1.5 pointer-events-none">
                  <Sun className="w-3 h-3 text-amber-500" />
                  <Moon className="w-3 h-3 text-stone-400" />
                </div>
                <div
                  className={`absolute top-0.5 bottom-0.5 w-6 h-6 rounded-full bg-amber-400 dark:bg-stone-100 shadow-md flex items-center justify-center transition-transform duration-300 ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                >
                  {theme === 'dark' ? (
                    <Moon className="w-3 h-3 text-stone-950 fill-stone-950" />
                  ) : (
                    <Sun className="w-3 h-3 text-stone-950 fill-stone-950" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

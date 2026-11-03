import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  Box,
  ChevronDown,
  Layers,
  ArrowRight,
  Sparkles,
  Package,
  Ribbon,
  FlaskConical,
  Boxes
} from 'lucide-react';
import { availableLanguages, initialCategories } from '../data/initialData';
import { getTranslation } from '../data/translations';
import FlagIcon from './FlagIcon';

export default function Header({
  activeLang,
  setActiveLang,
  cartCount = 0,
  onOpenContainerDrawer,
  theme,
  toggleTheme,
  onOpenPdfCatalog,
  onNavigateHome,
  onNavigateProducts,
  onNavigateQuality,
  onNavigateAbout,
  onNavigateContact
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const langDropdownRef = useRef(null);
  const productsDropdownRef = useRef(null);

  // Monitor scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(e.target)) {
        setProductsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLangObj = availableLanguages.find(l => l.code === activeLang) || availableLanguages[0];
  const t = (key) => getTranslation(key, activeLang);

  const categoryIcons = {
    tapes: Ribbon,
    textiles: Sparkles,
    adhesives: FlaskConical,
    packaging: Package,
    hardware: Boxes,
    all: Layers
  };

  const handleProductCategoryClick = (catId) => {
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateProducts) {
      onNavigateProducts(catId);
    } else {
      window.location.hash = catId === 'all' ? '#products' : `#products?category=${catId}`;
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 z-50 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300 ease-out ${
        isScrolled ? 'top-2 sm:top-3' : 'top-3 sm:top-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 w-full">
        
        {/* ============================================================== */}
        {/* 1. CAPSULE 1 (LEFT): BRAND LOGO                                */}
        {/* Strictly left-aligned; larger at top, compact on scroll.       */}
        {/* ============================================================== */}
        <div className={`rounded-full backdrop-blur-2xl backdrop-saturate-180 bg-white/45 dark:bg-[#0C0C10]/45 border border-white/60 dark:border-white/12 flex items-center shrink-0 pointer-events-auto transition-all duration-300 ease-out ${
          isScrolled
            ? 'h-10.5 sm:h-11.5 px-3 sm:px-4.5 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.85)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.2)]'
            : 'h-12 sm:h-13.5 px-4 sm:px-6 shadow-[0_10px_35px_rgba(0,0,0,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.9)] dark:shadow-[0_14px_45px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.25)]'
        }`}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
              else window.location.hash = '';
            }}
            className="flex items-center group relative cursor-pointer"
            title="MakeMattress Home"
          >
            {/* Light Mode Logo (Original) */}
            <img
              src="/images/logo.png"
              alt="MakeMattress"
              className={`w-auto object-contain transition-all duration-300 ease-out dark:hidden group-hover:scale-[1.03] group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] ${
                isScrolled ? 'h-5.5 sm:h-6.5' : 'h-6.5 sm:h-8'
              }`}
            />
            {/* Dark Mode Logo (White Vector SVG with White Glow/Shadow) */}
            <img
              src="/images/logo-white.svg"
              alt="MakeMattress"
              className={`w-auto object-contain transition-all duration-300 ease-out hidden dark:block group-hover:scale-[1.03] group-hover:drop-shadow-[0_4px_14px_rgba(255,255,255,0.75)] ${
                isScrolled ? 'h-5.5 sm:h-6.5' : 'h-6.5 sm:h-8'
              }`}
            />
          </a>
        </div>

        {/* ============================================================== */}
        {/* 2. CAPSULE 2 (CENTER): DESKTOP NAVIGATION WITH PRODUCTS DROPDOWN */}
        {/* Centered naturally in flex layout; collapses neatly under xl. */}
        {/* ============================================================== */}
        <nav className="hidden xl:flex rounded-full backdrop-blur-2xl backdrop-saturate-180 bg-white/45 dark:bg-[#0C0C10]/45 border border-white/60 dark:border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.85)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.2)] items-center whitespace-nowrap flex-nowrap shrink-0 h-11 sm:h-12 px-6 space-x-6 xl:space-x-8 text-[12px] uppercase tracking-[0.16em] font-medium text-stone-800 dark:text-stone-200 pointer-events-auto relative transition-all duration-300">
          
          {/* Products with Interactive Mega Dropdown */}
          <div
            className="relative"
            ref={productsDropdownRef}
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              onClick={() => handleProductCategoryClick('all')}
              className="hover:text-stone-950 dark:hover:text-white transition-colors py-2 flex items-center gap-1.5 cursor-pointer relative group uppercase tracking-[0.16em]"
            >
              <span>{t('nav_products')}</span>
              <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-900 dark:bg-amber-400 rounded-full group-hover:w-full transition-all duration-300"></span>
            </button>

            {/* Floating Dropdown Panel */}
            {productsDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-80 backdrop-blur-3xl bg-white/85 dark:bg-[#121216]/85 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-3 border border-white/60 dark:border-white/10 z-50 animate-fade-in text-stone-800 dark:text-stone-200 normal-case">
                
                <div className="px-3 py-2 border-b border-stone-200/60 dark:border-white/10 flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7A58] dark:text-amber-400">
                    B2B Ürün Kategorileri
                  </span>
                  <button
                    onClick={() => handleProductCategoryClick('all')}
                    className="text-[11px] font-semibold text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Tümünü Gör</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-1">
                  {initialCategories.map(cat => {
                    const IconComponent = categoryIcons[cat.id] || Layers;
                    const catKey = `cat_${cat.id}`;
                    const label = t(catKey) !== catKey ? t(catKey) : cat.name;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleProductCategoryClick(cat.id)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-white/10 transition-colors text-left cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-white/5 flex items-center justify-center text-stone-600 dark:text-stone-300 group-hover:bg-amber-500/15 group-hover:text-amber-500 transition-colors shrink-0">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-stone-800 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {label}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {onOpenPdfCatalog && (
                  <div className="mt-2 pt-2 border-t border-stone-200/60 dark:border-white/10">
                    <button
                      onClick={() => {
                        setProductsDropdownOpen(false);
                        onOpenPdfCatalog();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-black hover:bg-stone-900 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>3D Sayfalı PDF Kataloğu Aç</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <a
            href="#quality"
            onClick={(e) => {
              if (onNavigateQuality) {
                e.preventDefault();
                onNavigateQuality();
              }
            }}
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group shrink-0"
          >
            <span>{t('nav_quality')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-900 dark:bg-amber-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </a>

          <a
            href="#about"
            onClick={(e) => {
              if (onNavigateAbout) {
                e.preventDefault();
                onNavigateAbout();
              }
            }}
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group shrink-0"
          >
            <span>{t('nav_about')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-900 dark:bg-amber-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              if (onNavigateContact) {
                e.preventDefault();
                onNavigateContact();
              }
            }}
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1 relative group shrink-0"
          >
            <span>{t('nav_contact')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-900 dark:bg-amber-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        {/* ============================================================== */}
        {/* 3. CAPSULE 3 (RIGHT): LANGUAGE, CONTAINER, THEME & PDF BUTTON   */}
        {/* ============================================================== */}
        <div className="rounded-full backdrop-blur-2xl backdrop-saturate-180 bg-white/45 dark:bg-[#0C0C10]/45 border border-white/60 dark:border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.85)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.2)] flex items-center gap-1.5 sm:gap-2.5 whitespace-nowrap flex-nowrap shrink-0 h-11 sm:h-12 px-2 sm:px-3 pointer-events-auto transition-all duration-300">
          
          {/* A. Language Switcher */}
          <div className="relative hidden sm:block" ref={langDropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full backdrop-blur-md bg-white/40 dark:bg-white/[0.06] hover:bg-white/70 dark:hover:bg-white/12 border border-white/50 dark:border-white/10 text-stone-800 dark:text-stone-200 text-xs font-medium transition-all duration-300 cursor-pointer shrink-0 h-7.5 sm:h-8 px-2 sm:px-3 shadow-xs"
              aria-label="Select language"
              title={currentLangObj.label}
            >
              <FlagIcon code={currentLangObj.code} className="w-4.5 h-3 rounded-xs object-cover shadow-xs" />
              <ChevronDown className="w-2.5 h-2.5 text-stone-600 dark:text-stone-300 transition-transform duration-200" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 max-h-84 overflow-y-auto dropdown-scrollbar backdrop-blur-3xl bg-white/85 dark:bg-[#121216]/85 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] py-2 z-50 animate-fade-in text-stone-800 dark:text-stone-200 border border-white/60 dark:border-white/10">
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

          {/* B. Shipping Container Button with Corrugated Lines */}
          <button
            onClick={onOpenContainerDrawer}
            className="relative flex items-center gap-1.5 rounded-full backdrop-blur-md bg-white/40 dark:bg-white/[0.06] hover:bg-white/70 dark:hover:bg-white/12 border border-white/50 dark:border-white/10 text-stone-800 dark:text-stone-100 font-medium transition-all duration-300 cursor-pointer group active:scale-95 shrink-0 overflow-hidden h-7.5 sm:h-8 px-2 sm:px-3 text-[11.5px] shadow-xs"
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
            <span className="hidden md:inline font-medium relative z-10">{t('container_button')}</span>
            {cartCount > 0 && (
              <span className="bg-amber-500 text-stone-950 text-[9.5px] font-bold px-1.5 py-0.2 rounded-full leading-none shadow-xs relative z-10">
                {cartCount}
              </span>
            )}
          </button>

          {/* C. Modern Sliding Theme Switcher Toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            onClick={toggleTheme}
            className="rounded-full backdrop-blur-md bg-white/35 dark:bg-black/35 border border-white/40 dark:border-white/10 p-0.5 relative cursor-pointer transition-all duration-300 flex items-center shadow-inner shrink-0 w-11 sm:w-13 h-6.5 sm:h-7"
            title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
            aria-label="Toggle light or dark theme"
          >
            <div className="w-full flex justify-between items-center px-1.5 pointer-events-none">
              <Sun className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-amber-500" />
              <Moon className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-stone-400" />
            </div>
            <div
              className={`absolute top-0.5 bottom-0.5 rounded-full bg-amber-400 dark:bg-stone-100 shadow-md flex items-center justify-center transition-transform duration-300 ease-out w-5.5 sm:w-6 h-5.5 sm:h-6 ${
                theme === 'dark' ? 'translate-x-4.5 sm:translate-x-6' : 'translate-x-0'
              }`}
            >
              {theme === 'dark' ? (
                <Moon className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-stone-950 fill-stone-950" />
              ) : (
                <Sun className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-stone-950 fill-stone-950" />
              )}
            </div>
          </button>

          {/* D. Polite, Oval, Black PDF Catalog Button - 100% CENTRED TEXT */}
          <button
            onClick={onOpenPdfCatalog}
            className="hidden xl:inline-flex items-center justify-center text-center leading-none rounded-full bg-black hover:bg-stone-900 active:scale-95 text-white font-semibold tracking-wider uppercase shadow-sm transition-all duration-300 cursor-pointer shrink-0 h-7.5 sm:h-8 px-4 text-[11px]"
            title={t('pdf_catalog_title')}
          >
            <span className="inline-block leading-none">{t('pdf_catalog_button')}</span>
          </button>

          {/* Mobile & Tablet Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden p-1.5 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 4. FULL-SCREEN ANIMATED MOBILE MENU OVERLAY                     */}
      {/* ============================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto dropdown-scrollbar backdrop-blur-3xl bg-[#FAF8F4]/98 dark:bg-[#0C0C0F]/98 flex flex-col justify-between p-6 sm:p-10 animate-fade-in pointer-events-auto text-stone-900 dark:text-white">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-200/70 dark:border-white/10">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
              className="flex items-center group cursor-pointer"
            >
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

          {/* Center Navigation Links */}
          <div className="py-6 space-y-4 max-w-md mx-auto sm:mx-0 w-full">
            
            {/* Products Accordion on Mobile */}
            <div>
              <div className="flex items-center justify-between py-1.5">
                <button
                  onClick={() => handleProductCategoryClick('all')}
                  className="text-2xl sm:text-3xl font-light tracking-wide text-stone-900 hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400 transition-colors text-left"
                >
                  <span>{t('nav_products')}</span>
                </button>
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-white"
                >
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {mobileProductsOpen && (
                <div className="pl-4 py-2 space-y-2 border-l border-amber-500/30 my-2">
                  {initialCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleProductCategoryClick(cat.id)}
                      className="block text-sm text-stone-600 dark:text-stone-300 hover:text-amber-500 py-1"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#quality"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (onNavigateQuality) {
                  e.preventDefault();
                  onNavigateQuality();
                }
              }}
              className="block text-2xl sm:text-3xl font-light tracking-wide text-stone-900 hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400 transition-colors py-1.5"
            >
              <span>{t('nav_quality')}</span>
            </a>
            <a
              href="#about"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (onNavigateAbout) {
                  e.preventDefault();
                  onNavigateAbout();
                }
              }}
              className="block text-2xl sm:text-3xl font-light tracking-wide text-stone-900 hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400 transition-colors py-1.5"
            >
              <span>{t('nav_about')}</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (onNavigateContact) {
                  e.preventDefault();
                  onNavigateContact();
                }
              }}
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
                    <FlagIcon code={l.code} className="w-4 h-3 rounded-xs object-cover shadow-xs shrink-0" />
                    <span className="truncate">{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle Row in Overlay */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                {theme === 'dark' ? t('theme_dark') : t('theme_light')}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={theme === 'dark'}
                onClick={toggleTheme}
                className="w-13 h-7 rounded-full bg-stone-300 dark:bg-stone-800 p-0.5 relative cursor-pointer transition-colors shadow-inner flex items-center"
              >
                <div className="w-full flex justify-between items-center px-1.5 pointer-events-none">
                  <Sun className="w-3 h-3 text-amber-500" />
                  <Moon className="w-3 h-3 text-stone-400" />
                </div>
                <div
                  className={`w-6 h-6 rounded-full bg-amber-400 dark:bg-stone-100 shadow-md flex items-center justify-center transition-transform duration-300 ease-out absolute ${
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

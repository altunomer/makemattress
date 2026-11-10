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
  FileText,
  Package,
  Ribbon,
  FlaskConical,
  Boxes
} from 'lucide-react';
import { availableLanguages, initialCategories } from '../data/initialData';
import { getTranslation } from '../data/translations';
import FlagIcon from './FlagIcon';

export default function Header({
  categories = initialCategories,
  products = [],
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
  const megaMenuPanelRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // 700ms Mousetrap Delay: Prevents immediate closure on brief mouse movements
  const handleMouseEnterProducts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 700);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

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
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(e.target) &&
        (!megaMenuPanelRef.current || !megaMenuPanelRef.current.contains(e.target))
      ) {
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

  const defaultCategoryImages = {
    all: '/images/slider-logistics.jpg',
    tapes: '/images/mattress-tape-color.jpg',
    textiles: '/images/felt-color.jpg',
    packaging: '/images/pe-film-color.jpg',
    adhesives: '/images/hotmelts-thumb.jpg',
    hardware: '/images/staples-color.jpg'
  };

  const activeCategories = (categories && categories.length > 0 ? categories : initialCategories).filter(c => c.inMenu !== false);

  const categoryIcons = {
    tapes: Ribbon,
    textiles: Layers,
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
    <>
      {/* ============================================================== */}
      {/* 1. BACKDROP OVERLAY FOR MEGA DROPDOWN                          */}
      {/* Dims page content behind the wide menu panel                   */}
      {/* ============================================================== */}
      {productsDropdownOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/45 z-40 transition-opacity duration-200 pointer-events-auto"
          onClick={() => setProductsDropdownOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ============================================================== */}
      {/* 2. WIDE LUXURY MEGA DROPDOWN MENU (NEAR FULL-WIDTH)            */}
      {/* 700ms mousetrap delay keeps it open across mouse moves         */}
      {/* ============================================================== */}
      {productsDropdownOpen && (
        <div
          ref={megaMenuPanelRef}
          onMouseEnter={handleMouseEnterProducts}
          onMouseLeave={handleMouseLeaveProducts}
          className="fixed left-3 right-3 sm:left-5 sm:right-5 lg:left-1/2 lg:-translate-x-1/2 lg:w-[96vw] lg:max-w-[1440px] top-16 sm:top-20 z-50 pointer-events-auto bg-[#FAF8F4] dark:bg-[#121216] rounded-2xl border border-stone-200 dark:border-white/10 shadow-xl p-4 sm:p-6 overflow-hidden"
        >
          {/* Top Bar inside Mega Menu */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-200/80 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-white/[0.06] border border-stone-200/80 dark:border-white/10 flex items-center justify-center text-[#8C7A58] dark:text-[#D4B37F]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                  {t('mega_menu_title')}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block">
                  {t('mega_menu_subtitle')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleProductCategoryClick('all')}
                className="text-xs font-semibold text-[#8C7A58] dark:text-[#D4B37F] hover:text-stone-900 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group px-3 py-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-white/[0.06]"
              >
                <span>{t('view_all_products')} ({products.length > 0 ? products.length : '13+'})</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setProductsDropdownOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-200/70 dark:hover:bg-white/10 text-stone-400 hover:text-stone-700 dark:hover:text-white transition-colors cursor-pointer"
                title={t('close_menu')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Cards Grid with Visuals */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {activeCategories.map(cat => {
              const IconComponent = categoryIcons[cat.id] || Layers;
              const catKey = `cat_${cat.id}`;
              const label = t(catKey) !== catKey ? t(catKey) : cat.name;
              const img = cat.image || defaultCategoryImages[cat.id] || '/images/slider-logistics.jpg';
              const count = products.filter(p => cat.id === 'all' || p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleProductCategoryClick(cat.id)}
                  className="group flex flex-col text-left rounded-xl overflow-hidden p-2.5 transition-colors duration-200 bg-white dark:bg-white/[0.03] hover:bg-stone-100/80 dark:hover:bg-white/[0.06] border border-stone-200/80 dark:border-white/[0.08] hover:border-[#8C7A58] dark:hover:border-[#D4B37F] cursor-pointer"
                >
                  {/* Visual Thumbnail with Gradient and Badges */}
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-800 mb-2">
                    <img
                      src={img}
                      alt={label}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Floating Badge */}
                    {cat.badge && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-semibold uppercase tracking-wider">
                        {cat.badge}
                      </div>
                    )}

                    {/* Category Icon Badge */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-md bg-white/95 dark:bg-black/80 flex items-center justify-center text-[#8C7A58] dark:text-[#D4B37F]">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="space-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                        {label}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed font-light mt-0.5">
                        {cat.desc || `${count} ${t('b2b_options_label')}`}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 group-hover:text-amber-500 transition-colors border-t border-stone-200/50 dark:border-white/5 mt-2">
                      <span className="font-mono">{count > 0 ? `${count} ${t('products_count_label')}` : t('portfolio_badge')}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Action Footer Bar */}
          <div className="mt-5 pt-4 border-t border-stone-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
              <Box className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs">
                <strong className="text-stone-900 dark:text-white font-semibold">{t('moq_bypass_title')}</strong> {t('moq_bypass_desc')}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenPdfCatalog && (
                <button
                  onClick={() => {
                    setProductsDropdownOpen(false);
                    onOpenPdfCatalog();
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-white/10 hover:bg-stone-800 dark:hover:bg-white/20 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C4A46D]" />
                  <span>{t('pdf_catalog_3d_btn')}</span>
                </button>
              )}
              <button
                onClick={() => handleProductCategoryClick('all')}
                className="px-4 py-2 rounded-xl bg-[#8C7A58] hover:bg-[#7A6A4B] dark:bg-[#D4B37F] dark:hover:bg-[#E2C79D] text-white dark:text-stone-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer uppercase tracking-wider"
              >
                <span>{t('view_all_btn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-50 w-full px-3 sm:px-5 lg:px-6 pointer-events-none transition-all duration-300 ease-out ${
          isScrolled ? 'top-2 sm:top-3' : 'top-3 sm:top-4'
        }`}
      >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2 sm:gap-4 w-full">
        
        {/* ============================================================== */}
        {/* 1. CAPSULE 1 (LEFT): BRAND LOGO                                */}
        {/* Strictly left-aligned; larger at top, compact on scroll.       */}
        {/* ============================================================== */}
        <div className={`rounded-full backdrop-blur-md bg-white/80 dark:bg-[#0C0C10]/80 border border-stone-200/80 dark:border-white/10 flex items-center shrink-0 pointer-events-auto transition-all duration-300 ease-out ${
          isScrolled
            ? 'h-10.5 sm:h-11.5 px-3 sm:px-4.5 shadow-sm'
            : 'h-12 sm:h-13.5 px-4 sm:px-6 shadow-md'
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
        <nav className="hidden xl:flex rounded-full backdrop-blur-md bg-white/80 dark:bg-[#0C0C10]/80 border border-stone-200/80 dark:border-white/10 shadow-sm items-center whitespace-nowrap flex-nowrap shrink-0 h-11 sm:h-12 px-6 space-x-6 xl:space-x-8 text-[12px] uppercase tracking-[0.16em] font-medium text-stone-800 dark:text-stone-200 pointer-events-auto relative">
          
          {/* Products Trigger Button for Wide Mega Dropdown (700ms Mousetrap Delay) */}
          <div
            className="relative"
            ref={productsDropdownRef}
            onMouseEnter={handleMouseEnterProducts}
            onMouseLeave={handleMouseLeaveProducts}
          >
            <button
              onClick={() => {
                if (productsDropdownOpen) {
                  setProductsDropdownOpen(false);
                } else {
                  handleMouseEnterProducts();
                }
              }}
              className="hover:text-stone-950 dark:hover:text-white transition-colors py-2 flex items-center gap-1.5 cursor-pointer relative group uppercase tracking-[0.16em]"
            >
              <span>{t('nav_products')}</span>
              <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-[2px] bg-stone-900 dark:bg-amber-400 rounded-full transition-all duration-300 ${productsDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
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
        <div className="rounded-full backdrop-blur-md bg-white/80 dark:bg-[#0C0C10]/80 border border-stone-200/80 dark:border-white/10 shadow-sm flex items-center gap-1.5 sm:gap-2.5 whitespace-nowrap flex-nowrap shrink-0 h-11 sm:h-12 px-2 sm:px-3 pointer-events-auto">
          
          {/* A. Language Switcher */}
          <div className="relative hidden sm:block" ref={langDropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full bg-white/70 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/12 border border-stone-200/70 dark:border-white/10 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors cursor-pointer shrink-0 h-7.5 sm:h-8 px-2 sm:px-3"
              aria-label="Select language"
              title={currentLangObj.label}
            >
              <FlagIcon code={currentLangObj.code} className="w-4.5 h-3 rounded-xs object-cover shadow-xs" />
              <ChevronDown className="w-2.5 h-2.5 text-stone-600 dark:text-stone-300 transition-transform duration-200" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 max-h-84 overflow-y-auto dropdown-scrollbar bg-white dark:bg-[#141418] rounded-2xl shadow-xl py-2 z-50 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-white/10">
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

            <Box className="w-3.5 h-3.5 text-[#8C7A58] dark:text-[#D4B37F] relative z-10" />
            <span className="hidden md:inline font-medium relative z-10">{t('container_button')}</span>
            {cartCount > 0 && (
              <span className="bg-[#8C7A58] text-white dark:bg-[#D4B37F] dark:text-stone-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none relative z-10">
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
            className="rounded-full backdrop-blur-md bg-white/35 dark:bg-black/35 border border-stone-200/70 dark:border-white/10 p-0.5 relative cursor-pointer transition-all duration-300 flex items-center shrink-0 w-11 sm:w-13 h-6.5 sm:h-7"
            title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
            aria-label="Toggle light or dark theme"
          >
            <div className="w-full flex justify-between items-center px-1.5 pointer-events-none">
              <Sun className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#8C7A58]" />
              <Moon className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-stone-400" />
            </div>
            <div
              className={`absolute top-0.5 bottom-0.5 rounded-full bg-[#D4B37F] dark:bg-stone-100 shadow-xs flex items-center justify-center transition-transform duration-300 ease-out w-5.5 sm:w-6 h-5.5 sm:h-6 ${
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
        <div className="fixed inset-0 z-50 overflow-y-auto dropdown-scrollbar bg-[#FAF8F4] dark:bg-[#0C0C0F] flex flex-col justify-between p-6 sm:p-10 pointer-events-auto text-stone-900 dark:text-white">
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
  </>
  );
}

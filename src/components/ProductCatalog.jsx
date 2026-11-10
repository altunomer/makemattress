import React, { useState } from 'react';
import { Search, Box, ArrowRight, Check, FileText, X } from 'lucide-react';
import { initialCategories } from '../data/initialData';
import { getTranslation } from '../data/translations';

export default function ProductCatalog({
  products = [],
  categories = initialCategories,
  activeLang = 'en',
  onSelectProduct,
  onToggleContainerItem,
  containerItems = [],
  onOpenPdfCatalog
}) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const t = (key) => getTranslation(key, activeLang);

  const activeCategories = categories && categories.length > 0 ? categories : initialCategories;

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const name = p.translations?.[activeLang]?.name || p.name;
    const subtitle = p.translations?.[activeLang]?.subtitle || p.subtitle;
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeCatObj = activeCategories.find(c => c.id === selectedCat);
  const activeCatLabel = activeCatObj
    ? (t(`cat_${activeCatObj.id}`) !== `cat_${activeCatObj.id}` ? t(`cat_${activeCatObj.id}`) : activeCatObj.name)
    : t('cat_all');

  return (
    <section id="products" className="pt-6 sm:pt-8 pb-12 sm:pb-16 relative z-10 scroll-mt-20">
      {/* Backwards compatibility anchor for #catalog */}
      <span id="catalog" className="absolute -top-24 pointer-events-none" aria-hidden="true"></span>

      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
        
        {/* 1. Open Borderless Catalog Header & Search Ribbon */}
        <div className="pb-4 mb-5 border-b border-stone-200/70 dark:border-white/[0.06] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 font-medium tracking-tight">
              {t('products_title')}
            </h2>

            {selectedCat !== 'all' && (
              <div className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-stone-900 dark:bg-[#D4B37F] text-white dark:text-stone-950 text-xs font-medium">
                <span>{activeCatLabel}</span>
                <button
                  onClick={() => setSelectedCat('all')}
                  className="p-0.5 rounded-full hover:bg-white/20 dark:hover:bg-black/15 cursor-pointer"
                  aria-label="Clear filter"
                  title="Show All"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <span className="text-xs text-stone-400 dark:text-stone-500 font-normal">
              ({filteredProducts.length})
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[240px] sm:min-w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                aria-label={t('search_placeholder')}
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-10 py-2 bg-stone-100/70 dark:bg-white/[0.04] border border-stone-200/70 dark:border-white/[0.08] rounded-lg text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                >
                  {t('search_clear')}
                </button>
              )}
            </div>

            {onOpenPdfCatalog && (
              <button
                onClick={onOpenPdfCatalog}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border border-stone-200/80 dark:border-white/[0.08] text-xs font-medium transition-colors cursor-pointer shrink-0"
                title="Open 3D interactive PDF catalog"
              >
                <FileText className="w-3.5 h-3.5 text-[#8C7A58] dark:text-[#D4B37F]" />
                <span>{t('pdf_catalog_hero_btn')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Horizontal Category Strip (< lg) */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-5 scrollbar-none">
          {activeCategories.map(cat => {
            const isActive = selectedCat === cat.id;
            const catKey = `cat_${cat.id}`;
            const catLabel = t(catKey) !== catKey ? t(catKey) : cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-[#D4B37F] dark:text-stone-950 font-medium'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-white/[0.05]'
                }`}
              >
                {catLabel}
              </button>
            );
          })}
        </div>

        {/* 2. Clockwork Open Split Catalog: Clean Left Category List + Gallery Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* LEFT CONTROL PANEL (Borderless sticky list) */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-20 border-r border-stone-200/60 dark:border-white/[0.06] pr-3">
            <nav className="space-y-1" aria-label="Product Categories">
              {activeCategories.map(cat => {
                const isActive = selectedCat === cat.id;
                const catKey = `cat_${cat.id}`;
                const catLabel = t(catKey) !== catKey ? t(catKey) : cat.name;
                const catCount = products.filter(p => cat.id === 'all' || p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-stone-900 text-white dark:bg-[#D4B37F] dark:text-stone-950 font-medium'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="truncate">{catLabel}</span>
                    <span className={`text-[11px] shrink-0 ${isActive ? 'opacity-80' : 'text-stone-400 dark:text-stone-600'}`}>
                      {catCount}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* RIGHT MAIN VIEW (Uncluttered Gallery Tiles) */}
          <div className="lg:col-span-9 xl:col-span-10">
            <div key={selectedCat} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 animate-fade-in">
              {filteredProducts.map(product => {
                const isAdded = containerItems.some(i => i.id === product.id);
                const localizedName = product.translations?.[activeLang]?.name || product.name;
                const localizedSubtitle = product.translations?.[activeLang]?.subtitle || product.subtitle;

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col justify-between"
                  >
                    <div>
                      {/* Clean Framed Image - Zero Overlays or Nested Borders */}
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/70 dark:border-white/[0.06] group-hover:border-[#8C7A58] dark:group-hover:border-[#D4B37F] transition-colors cursor-pointer"
                      >
                        <img
                          src={product.thumb}
                          alt={localizedName}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>

                      {/* Open Clean Product Copy */}
                      <div className="pt-3">
                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="text-sm sm:text-base text-stone-900 dark:text-stone-100 font-medium leading-snug group-hover:text-[#8C7A58] dark:group-hover:text-[#D4B37F] transition-colors cursor-pointer line-clamp-2"
                        >
                          {localizedName}
                        </h3>

                        <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-1 font-normal">
                          {localizedSubtitle}
                        </p>
                      </div>
                    </div>

                    {/* Minimal Unboxed Bottom Action Line */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="min-h-[36px] text-xs font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer transition-colors"
                        title={t('view_specs')}
                      >
                        <span>{t('view_specs')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => onToggleContainerItem(product)}
                        className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-stone-100 hover:bg-stone-900 hover:text-white dark:bg-white/[0.06] dark:hover:bg-[#D4B37F] dark:hover:text-stone-950 text-stone-700 dark:text-stone-300'
                        }`}
                        title={isAdded ? t('in_container') : t('add_to_container')}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t('in_container')}</span>
                          </>
                        ) : (
                          <>
                            <Box className="w-3.5 h-3.5" />
                            <span>+</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-sm text-stone-500 dark:text-stone-400">No components found matching your search.</p>
                <button
                  onClick={() => { setSelectedCat('all'); setSearchQuery(''); }}
                  className="mt-3 text-xs font-semibold text-[#8C7A58] dark:text-[#D4B37F] underline cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

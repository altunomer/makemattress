import React, { useState } from 'react';
import { Search, Eye, Box, ArrowRight, Layers, Check, Sparkles, Filter, FileText } from 'lucide-react';
import { initialCategories } from '../data/initialData';
import { getTranslation } from '../data/translations';

export default function ProductCatalog({
  products,
  activeLang,
  onSelectProduct,
  onToggleContainerItem,
  containerItems,
  onOpenPdfCatalog
}) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const t = (key) => getTranslation(key, activeLang);

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

  return (
    <section id="products" className="py-24 relative z-10 scroll-mt-20">
      {/* Backwards compatibility anchor for #catalog */}
      <span id="catalog" className="absolute -top-24 pointer-events-none" aria-hidden="true"></span>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-stone-200/50 dark:bg-white/[0.06] border border-stone-300/60 dark:border-white/10 text-[#8C7A58] dark:text-[#D4B37F] text-[10px] uppercase font-bold tracking-[0.25em] mb-3">
              <Sparkles className="w-3 h-3" />
              <span>{t('products_badge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal tracking-tight">
              {t('products_title')}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-sm font-light leading-relaxed">
              {t('products_subtitle')}
            </p>

            {onOpenPdfCatalog && (
              <button
                onClick={onOpenPdfCatalog}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 hover:from-amber-500/25 hover:to-rose-500/20 border border-amber-500/30 text-stone-900 dark:text-white text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-sm cursor-pointer shrink-0"
                title="Open 3D interactive PDF catalog"
              >
                <FileText className="w-4 h-4 text-rose-500" />
                <span>{t('pdf_catalog_hero_btn')}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold">2026</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters & Search Bar in Liquid Glass Control Bar */}
        <div className="liquid-glass-elevated rounded-3xl p-3 sm:p-4 mb-12 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {initialCategories.map(cat => {
              const isActive = selectedCat === cat.id;
              const catKey = `cat_${cat.id}`;
              const catLabel = t(catKey) !== catKey ? t(catKey) : cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-stone-900 to-stone-800 dark:from-[#D4B37F] dark:to-[#E8CA9B] text-white dark:text-stone-950 shadow-md scale-102'
                      : 'backdrop-blur-md bg-white/40 dark:bg-white/[0.04] text-stone-700 dark:text-stone-300 hover:bg-white/80 dark:hover:bg-white/[0.1] border border-stone-200/60 dark:border-white/[0.06]'
                  }`}
                >
                  {catLabel}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 backdrop-blur-xl bg-white/60 dark:bg-white/[0.05] border border-stone-200/80 dark:border-white/10 rounded-full text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              >
                {t('search_clear')}
              </button>
            )}
          </div>
        </div>

        {/* Product Grid with Smooth Category Transition Animation (3 columns on mobile) */}
        <div key={selectedCat} className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 animate-fade-in">
          {filteredProducts.map(product => {
            const isAdded = containerItems.some(i => i.id === product.id);
            const localizedName = product.translations?.[activeLang]?.name || product.name;
            const localizedSubtitle = product.translations?.[activeLang]?.subtitle || product.subtitle;
            const catKey = `cat_${product.category}`;
            const localizedCategoryName = t(catKey) !== catKey ? t(catKey) : product.categoryName;

            return (
              <div
                key={product.id}
                className="liquid-glass group rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden flex flex-col justify-between relative shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Top Specular Line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent z-10"></div>

                {/* Image Container */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-4/3 bg-stone-100 dark:bg-stone-900 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.thumb}
                    alt={localizedName}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none"></div>

                  {/* Badges */}
                  <div className="absolute top-1.5 left-1.5 sm:top-3.5 sm:left-3.5 flex flex-col gap-1 z-10">
                    <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full backdrop-blur-xl bg-black/60 text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider border border-white/15 truncate max-w-[80px] sm:max-w-none">
                      {localizedCategoryName}
                    </span>
                    {product.featured && (
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[9px] font-bold uppercase tracking-widest shadow-xs">
                        Export Grade
                      </span>
                    )}
                  </div>

                  {/* Quick View Hover Overlay */}
                  <div className="absolute inset-0 backdrop-blur-xs bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 text-xs font-semibold shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 border border-white/30 dark:border-white/10">
                      <Eye className="w-3.5 h-3.5 text-[#8C7A58] dark:text-[#D4B37F]" />
                      <span>{t('view_specs')}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-2 sm:p-4 lg:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                  <div>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif text-xs sm:text-lg lg:text-2xl text-stone-900 dark:text-stone-100 font-semibold leading-tight sm:leading-snug hover:text-[#8C7A58] dark:hover:text-[#D4B37F] transition-colors cursor-pointer line-clamp-2"
                    >
                      {localizedName}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-medium mt-1 line-clamp-1 sm:line-clamp-2 hidden sm:block">
                      {localizedSubtitle}
                    </p>

                    {/* Key Technical Specs Preview Chips (visible on tablet/desktop) */}
                    {product.specs && (
                      <div className="mt-4 pt-4 border-t border-stone-200/60 dark:border-white/[0.06] hidden sm:grid grid-cols-2 gap-2 text-[11px]">
                        {Object.entries(product.specs).slice(0, 2).map(([key, val], idx) => {
                          const specMap = {
                            'Width Options': 'spec_width',
                            'Material': 'spec_material',
                            'Roll Length': 'spec_roll_length',
                            'Customization': 'spec_customization',
                            'MOQ': 'spec_moq',
                            'Thickness': 'spec_thickness',
                            'Density': 'spec_density',
                            'Packaging': 'spec_packaging',
                            'Weight': 'spec_weight',
                            'Colors': 'spec_colors',
                            'Standard Roll': 'spec_standard_roll',
                            'Application': 'spec_application',
                            'Wire Diameter': 'spec_wire_diameter',
                            'Tensile Strength': 'spec_tensile_strength',
                            'Coil Height': 'spec_coil_height',
                            'Coating': 'spec_coating'
                          };
                          const localizedKey = specMap[key] && t(specMap[key]) !== specMap[key] ? t(specMap[key]) : key;
                          return (
                            <div
                              key={idx}
                              className="backdrop-blur-md bg-stone-100/70 dark:bg-white/[0.04] p-2.5 rounded-xl border border-stone-200/60 dark:border-white/[0.06]"
                            >
                              <span className="block text-[9px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold truncate">
                                {localizedKey}
                              </span>
                              <span className="text-stone-800 dark:text-stone-200 font-semibold truncate block mt-0.5">
                                {val}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-1.5 sm:pt-2 flex items-center justify-between gap-1 sm:gap-2 border-t border-stone-200/60 dark:border-white/[0.06]">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-[10px] sm:text-xs font-semibold text-[#8C7A58] dark:text-[#D4B37F] hover:underline inline-flex items-center gap-0.5 sm:gap-1 transition-colors cursor-pointer shrink-0"
                      title={t('view_specs')}
                    >
                      <span className="hidden sm:inline">{t('view_specs')}</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleContainerItem(product)}
                      className={`p-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shrink-0 ${
                        isAdded
                          ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm'
                          : 'backdrop-blur-md bg-stone-200/60 dark:bg-white/[0.08] text-stone-800 dark:text-stone-200 hover:bg-[#8C7A58] hover:text-white dark:hover:bg-[#D4B37F] dark:hover:text-stone-950 border border-stone-300/50 dark:border-white/10'
                      }`}
                      title={isAdded ? t('in_container') : t('add_to_container')}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline">{t('in_container')}</span>
                        </>
                      ) : (
                        <>
                          <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline">{t('add_to_container')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="liquid-glass text-center py-16 rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-sm text-stone-500 dark:text-stone-400">No components found matching your search.</p>
            <button
              onClick={() => { setSelectedCat('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-[#8C7A58] dark:text-[#D4B37F] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

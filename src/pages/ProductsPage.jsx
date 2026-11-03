import React, { useState, useEffect } from 'react';
import {
  Search,
  Eye,
  Box,
  ArrowRight,
  Check,
  Sparkles,
  Filter,
  FileText,
  ChevronRight,
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { initialCategories } from '../data/initialData';
import { getTranslation } from '../data/translations';

export default function ProductsPage({
  products = [],
  categories = initialCategories,
  activeLang = 'en',
  onSelectProduct,
  onToggleContainerItem,
  containerItems = [],
  onOpenPdfCatalog,
  initialCategory = 'all'
}) {
  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const t = (key) => getTranslation(key, activeLang);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCat(initialCategory);
    }
  }, [initialCategory]);

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

  const activeCategoryObj = categories.find(c => c.id === selectedCat) || { name: 'Tüm Bileşenler' };

  return (
    <div className="min-h-screen pt-28 pb-20 px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto text-stone-900 dark:text-stone-100">
      
      {/* 1. Header & Breadcrumb */}
      <div className="mb-8 space-y-3">
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <a href="#" className="hover:text-stone-900 dark:hover:text-white transition-colors">
            Anasayfa
          </a>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-[#8C7A58] dark:text-amber-400 font-semibold">
            {t('nav_products')}
          </span>
          {selectedCat !== 'all' && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-400" />
              <span className="text-stone-700 dark:text-stone-200">{activeCategoryObj.name}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-stone-200/50 dark:bg-white/[0.06] border border-stone-300/60 dark:border-white/10 text-[#8C7A58] dark:text-[#D4B37F] text-[10px] uppercase font-bold tracking-[0.25em] mb-2">
              <Sparkles className="w-3 h-3" />
              <span>MakeMattress B2B Export Catalog</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 dark:text-stone-100">
              {selectedCat === 'all' ? t('products_title') : activeCategoryObj.name}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
              Kayseri üretim tesislerimizden doğrudan konteynere yüklenen endüstriyel yatak bileşenleri, fitiller, sünger kimyasalları ve ambalaj malzemeleri.
            </p>
          </div>

          {/* Quick PDF 3D Trigger */}
          {onOpenPdfCatalog && (
            <button
              onClick={onOpenPdfCatalog}
              className="px-4 py-2 rounded-full bg-black hover:bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm self-start md:self-auto shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>3D Kataloğu Aç</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Category Filters & Search Bar Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
        
        {/* Category Filter Pills (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 dropdown-scrollbar -mx-2 px-2">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-[#8C7A58] text-white shadow-md'
                : 'backdrop-blur-md bg-stone-200/50 dark:bg-white/[0.05] text-stone-700 dark:text-stone-300 hover:bg-stone-300/60 dark:hover:bg-white/10'
            }`}
          >
            Tüm Bileşenler ({products.length})
          </button>

          {categories.filter(c => c.id !== 'all').map(cat => {
            const count = products.filter(p => p.category === cat.id).length;
            const catKey = `cat_${cat.id}`;
            const label = t(catKey) !== catKey ? t(catKey) : cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  selectedCat === cat.id
                    ? 'bg-[#8C7A58] text-white shadow-md'
                    : 'backdrop-blur-md bg-stone-200/50 dark:bg-white/[0.05] text-stone-700 dark:text-stone-300 hover:bg-stone-300/60 dark:hover:bg-white/10'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px] lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-2.5 backdrop-blur-xl bg-white/70 dark:bg-white/[0.05] border border-stone-200/80 dark:border-white/10 rounded-full text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#8C7A58] transition-all"
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

      {/* 3. Product Grid: 3 Columns on Mobile, 3 Columns on Desktop */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 animate-fade-in">
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 p-8 liquid-glass rounded-3xl max-w-md mx-auto">
          <p className="text-sm text-stone-500 dark:text-stone-400">Bu kategoride veya aramaya uygun ürün bulunamadı.</p>
          <button
            onClick={() => { setSelectedCat('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 rounded-full bg-amber-500 text-stone-950 font-semibold text-xs cursor-pointer"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

    </div>
  );
}

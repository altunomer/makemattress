import React, { useState } from 'react';
import {
  ArrowLeft,
  Box,
  Check,
  Share2,
  FileText,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
  Layers,
  Eye
} from 'lucide-react';
import { getTranslation } from '../data/translations';
import { companyData } from '../data/initialData';

export default function ProductDetailPage({
  product,
  allProducts = [],
  activeLang = 'en',
  onBack,
  onSelectProduct,
  onToggleContainerItem,
  containerItems = [],
  onOpenPdfCatalog
}) {
  if (!product) return null;

  const t = (key) => getTranslation(key, activeLang);

  // Gallery image selection
  const allImages = [
    product.thumb,
    ...(product.gallery || [])
  ].filter(Boolean);

  const [activeImage, setActiveImage] = useState(allImages[0] || product.thumb);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const isAdded = containerItems.some(i => i.id === product.id);

  // Localized texts
  const localizedName = product.translations?.[activeLang]?.name || product.name;
  const localizedSubtitle = product.translations?.[activeLang]?.subtitle || product.subtitle;
  const localizedDesc = product.translations?.[activeLang]?.description || product.description;
  const catKey = `cat_${product.category}`;
  const localizedCategoryName = t(catKey) !== catKey ? t(catKey) : product.categoryName;

  // WhatsApp Quote Link
  const whatsappNumber = companyData.phone.replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(
    `Hello MakeMattress Team! I am interested in B2B container pricing for:\n\n• Product: ${product.name}\n• Category: ${product.categoryName || product.category}\n• Quantity / Volume: ${quantity} unit(s)\n\nPlease share export quotation and container loading specs.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products from same category
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || !product.category))
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-28 pb-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto text-stone-900 dark:text-stone-100">
      
      {/* 1. Breadcrumbs & Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 text-xs text-stone-500 dark:text-stone-400">
        <nav className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onBack}
            className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{t('nav_products')}</span>
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-600 dark:text-stone-300">{localizedCategoryName}</span>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-[#8C7A58] dark:text-amber-400 font-semibold truncate max-w-[200px] sm:max-w-none">
            {localizedName}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-full backdrop-blur-md bg-stone-200/60 dark:bg-white/[0.08] hover:bg-stone-300/60 dark:hover:bg-white/15 text-stone-700 dark:text-stone-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            title="Bağlantıyı Kopyala"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Kopyalandı!' : 'Paylaş'}</span>
          </button>

          <button
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-full backdrop-blur-md bg-stone-200/60 dark:bg-white/[0.08] hover:bg-stone-300/60 dark:hover:bg-white/15 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kataloğa Dön</span>
          </button>
        </div>
      </div>

      {/* 2. Main Product Hero Section (WooCommerce / E-Commerce Two-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 shadow-xl border border-stone-200/60 dark:border-white/10 group">
            <img
              src={activeImage}
              alt={localizedName}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            
            {/* Top Specular Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent"></div>

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <span className="px-3.5 py-1 rounded-full backdrop-blur-xl bg-black/60 text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                {localizedCategoryName}
              </span>
              {product.featured && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                  Export Grade
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails row if more than 1 image */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 dropdown-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImage === img
                      ? 'border-amber-500 shadow-md scale-102'
                      : 'border-stone-200 dark:border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Manufacturing Assurance Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="p-3.5 rounded-2xl backdrop-blur-md bg-stone-100/70 dark:bg-white/[0.04] border border-stone-200/60 dark:border-white/06 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-stone-900 dark:text-stone-100">Kayseri Export QA</p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400">100% Pre-shipment audit</p>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl backdrop-blur-md bg-stone-100/70 dark:bg-white/[0.04] border border-stone-200/60 dark:border-white/06 flex items-center gap-3">
              <Truck className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-stone-900 dark:text-stone-100">Mixed Container Load</p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400">Zero MOQ consolidation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Commerce Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>B2B Industrial Mattress Component</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-bold leading-tight">
                {localizedName}
              </h1>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-medium mt-1">
                {localizedSubtitle}
              </p>
            </div>

            {/* Description */}
            <div className="p-4 sm:p-5 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-white/[0.03] border border-stone-200/70 dark:border-white/10 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {localizedDesc}
            </div>

            {/* Key Technical Specs Table */}
            {product.specs && (
              <div className="space-y-2.5">
                <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Teknik Özellikler & Fabrika Standartları</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl backdrop-blur-md bg-stone-100/70 dark:bg-white/[0.04] border border-stone-200/60 dark:border-white/[0.06] flex items-center justify-between gap-2"
                    >
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                        {key}
                      </span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100 text-right">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Box: Quantity, Add to Container, WhatsApp Quote */}
          <div className="p-5 sm:p-6 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121216]/90 border border-stone-200/80 dark:border-white/10 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Konsolide Yükleme (Consolidation)
                </p>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konteynere Eklemeye Uygun</span>
                </p>
              </div>

              {/* Quantity incrementer */}
              <div className="flex items-center gap-2 rounded-full border border-stone-300 dark:border-white/15 px-3 py-1 bg-stone-50 dark:bg-white/5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-bold px-1.5 cursor-pointer"
                >
                  -
                </button>
                <span className="text-xs font-bold text-stone-900 dark:text-white w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-bold px-1.5 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Add to Mixed Container Button */}
              <button
                onClick={() => onToggleContainerItem(product)}
                className={`w-full py-3.5 px-5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-[#8C7A58] hover:bg-[#726344] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Konteynerde Mevcut</span>
                  </>
                ) : (
                  <>
                    <Box className="w-4 h-4" />
                    <span>Konteynere Ekle</span>
                  </>
                )}
              </button>

              {/* WhatsApp RFQ Quote Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Fiyat İste</span>
              </a>
            </div>

            {/* 3D PDF Catalog Trigger */}
            {onOpenPdfCatalog && (
              <button
                onClick={onOpenPdfCatalog}
                className="w-full py-2.5 px-4 rounded-full backdrop-blur-md bg-stone-100 dark:bg-white/[0.05] hover:bg-stone-200 dark:hover:bg-white/10 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-stone-200/60 dark:border-white/10"
              >
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>3D Sayfalı PDF Kataloğu Aç ({t('pdf_catalog_button')})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Related Products / Sourcing Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-stone-200/80 dark:border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                Bu Kategorideki Diğer Bileşenler
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Aynı konteynere ekleyebileceğiniz tamamlayıcı yatak malzemeleri.
              </p>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#8C7A58] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Tümünü Gör</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel)}
                className="liquid-glass rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 p-4 border border-stone-200/60 dark:border-white/10"
              >
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 mb-3 relative">
                  <img src={rel.thumb} alt={rel.name} className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white truncate">
                  {rel.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                  {rel.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import {
  ArrowLeft,
  Box,
  Check,
  Share2,
  FileText,
  MessageCircle,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
  Layers
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
    <div className="min-h-screen pt-22 pb-14 px-3 sm:px-5 lg:px-6 max-w-[1440px] mx-auto text-stone-900 dark:text-stone-100">
      
      {/* 1. Breadcrumbs & Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs text-stone-500 dark:text-stone-400">
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
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-white/10">
            <img
              src={activeImage}
              alt={localizedName}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails row if more than 1 image */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 dropdown-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer shrink-0 ${
                    activeImage === img
                      ? 'border-[#8C7A58] dark:border-[#D4B37F]'
                      : 'border-stone-200 dark:border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Manufacturing Assurance Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-white/[0.04] border border-stone-200/70 dark:border-white/[0.06] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#8C7A58] dark:text-[#D4B37F] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Kayseri Export QA</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">100% Pre-shipment audit</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-white/[0.04] border border-stone-200/70 dark:border-white/[0.06] flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#8C7A58] dark:text-[#D4B37F] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Mixed Container Load</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">Zero MOQ consolidation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Commerce Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="inline-block text-xs font-semibold text-[#8C7A58] dark:text-[#D4B37F] mb-1">
                {localizedCategoryName}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-semibold leading-tight">
                {localizedName}
              </h1>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-medium mt-1">
                {localizedSubtitle}
              </p>
            </div>

            {/* Description */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-stone-200/70 dark:border-white/10 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {localizedDesc}
            </div>

            {/* Key Technical Specs Table (Flattened cleanly) */}
            {product.specs && (
              <div className="space-y-2">
                <h2 className="text-xs uppercase font-bold tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#8C7A58] dark:text-[#D4B37F]" />
                  <span>{t('spec_factory_specs')}</span>
                </h2>
                <div className="rounded-2xl border border-stone-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.02] divide-y divide-stone-200/60 dark:divide-white/[0.06] text-xs">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2.5 flex items-center justify-between gap-2"
                    >
                      <span className="text-stone-500 dark:text-stone-400 font-medium">
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
          <div className="p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-[#121216]/90 border border-stone-200/80 dark:border-white/10 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {t('drawer_header_title')}
                </p>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('moq_consolidated')}</span>
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
                    <span>{t('in_container')}</span>
                  </>
                ) : (
                  <>
                    <Box className="w-4 h-4" />
                    <span>{t('add_to_container')}</span>
                  </>
                )}
              </button>

              {/* WhatsApp RFQ Quote Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Fiyat İste</span>
              </a>
            </div>

            {/* 3D PDF Catalog Trigger */}
            {onOpenPdfCatalog && (
              <button
                onClick={onOpenPdfCatalog}
                className="w-full py-2.5 px-4 rounded-full bg-stone-100 dark:bg-white/[0.05] hover:bg-stone-200 dark:hover:bg-white/10 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-stone-200/70 dark:border-white/10"
              >
                <FileText className="w-3.5 h-3.5 text-[#8C7A58] dark:text-[#D4B37F]" />
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
                Teklif listenize ekleyebileceğiniz tamamlayıcı yatak malzemeleri.
              </p>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#8C7A58] dark:text-[#D4B37F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Tümünü Gör</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel)}
                className="rounded-2xl overflow-hidden cursor-pointer group bg-white dark:bg-[#121216] border border-stone-200/80 dark:border-white/10 hover:border-[#8C7A58] dark:hover:border-[#D4B37F] transition-colors p-3.5"
              >
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 mb-3 relative">
                  <img src={rel.thumb} alt={rel.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-white truncate group-hover:text-[#8C7A58] dark:group-hover:text-[#D4B37F] transition-colors">
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

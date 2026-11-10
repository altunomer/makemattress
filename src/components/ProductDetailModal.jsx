import React, { useState, useEffect } from 'react';
import { X, Play, Box, Check, MessageSquare, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function ProductDetailModal({
  product,
  activeLang,
  onClose,
  onToggleContainer,
  isAdded
}) {
  if (!product) return null;
  const t = (key) => getTranslation(key, activeLang);

  const [activeMedia, setActiveMedia] = useState({
    type: 'image',
    src: product.thumb
  });

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const localizedName = product.translations?.[activeLang]?.name || product.name;
  const localizedSubtitle = product.translations?.[activeLang]?.subtitle || product.subtitle;
  const localizedDesc = product.translations?.[activeLang]?.description || product.description;
  const catKey = product.category ? `cat_${product.category}` : null;
  const localizedCategoryName = catKey && t(catKey) !== catKey ? t(catKey) : product.categoryName;

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

  const whatsappMessage = encodeURIComponent(
    `Hello MakeMattress team, I am interested in sourcing ${product.name} (Ref: ${product.slug}). Could you please share export pricing, MOQ and container loading volume details?`
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/55 dark:bg-black/75 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F4] dark:bg-[#121217] rounded-2xl shadow-2xl border border-stone-200/80 dark:border-white/10 overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-modal-zoom"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Specular Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent z-20"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full backdrop-blur-xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-stone-800 dark:text-stone-200 flex items-center justify-center shadow-md transition-all border border-stone-200/50 dark:border-white/10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Media & Gallery */}
        <div className="w-full md:w-1/2 bg-stone-100/70 dark:bg-stone-900/60 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200/70 dark:border-white/[0.08]">
          {/* Main Media Display */}
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-black/10 dark:bg-black/40 shadow-inner mb-4 border border-stone-200/60 dark:border-white/[0.06]">
            {activeMedia.type === 'video' ? (
              <iframe
                src={activeMedia.src}
                title={localizedName}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={activeMedia.src}
                alt={localizedName}
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>

          {/* Thumbnails list */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveMedia({ type: 'image', src: product.thumb })}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                activeMedia.type === 'image' && activeMedia.src === product.thumb
                  ? 'border-[#8C7A58] dark:border-[#D4B37F] scale-105 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={product.thumb} alt="Main" className="w-full h-full object-cover" />
            </button>

            {product.gallery?.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMedia({ type: 'image', src: imgUrl })}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                  activeMedia.type === 'image' && activeMedia.src === imgUrl
                    ? 'border-[#8C7A58] dark:border-[#D4B37F] scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}

            {product.video && (
              <button
                onClick={() => setActiveMedia({ type: 'video', src: product.video })}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 flex flex-col items-center justify-center bg-stone-900 text-white transition-all cursor-pointer ${
                  activeMedia.type === 'video' ? 'border-amber-400 scale-105 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <Play className="w-5 h-5 text-amber-400" />
                <span className="text-xs uppercase tracking-wider font-bold mt-1">Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Technical Specs & Inquiries */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto dropdown-scrollbar">
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-stone-100 dark:bg-white/[0.06] border border-stone-200/80 dark:border-white/10 text-[#8C7A58] dark:text-[#D4B37F] text-xs uppercase font-semibold tracking-wider mb-2">
                <span>{localizedCategoryName}</span>
                <span>&bull;</span>
                <span className="font-mono">Ref: {product.slug}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                {localizedName}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400 mt-1">
                {localizedSubtitle}
              </p>
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              <p>{localizedDesc || "Premium industrial component engineered for mattress production lines. Contact us for custom dimensions, tensile tests, and mixed load container allocation."}</p>
            </div>

            {/* Technical Specifications Table */}
            {product.specs && (
              <div className="rounded-2xl border border-stone-200/80 dark:border-white/[0.08] backdrop-blur-md bg-stone-50/60 dark:bg-white/[0.03] overflow-hidden text-xs">
                <div className="px-4 py-2.5 bg-stone-100/70 dark:bg-white/[0.05] font-bold text-stone-800 dark:text-stone-200 uppercase text-xs tracking-wider border-b border-stone-200/60 dark:border-white/[0.06] flex items-center justify-between">
                  <span>{t('spec_factory_specs')}</span>
                  <span className="text-[11px] text-[#8C7A58] dark:text-[#D4B37F] font-semibold">{t('spec_verified_qa')}</span>
                </div>
                <div className="divide-y divide-stone-200/60 dark:divide-white/[0.06]">
                  {Object.entries(product.specs).map(([specKey, specVal], idx) => {
                    const localizedKey = specMap[specKey] && t(specMap[specKey]) !== specMap[specKey] ? t(specMap[specKey]) : specKey;
                    return (
                      <div key={idx} className="px-4 py-2.5 flex justify-between items-center text-xs">
                        <span className="text-stone-500 dark:text-stone-400 font-medium">{localizedKey}</span>
                        <span className="text-stone-900 dark:text-stone-100 font-semibold text-right max-w-[60%]">{specVal}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* B2B Assurance Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-300 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('badge_inhouse_qa')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F]" />
                <span>{t('badge_mixed_container')}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-stone-200/70 dark:border-white/[0.08] space-y-2.5">
            <div className="flex items-center gap-3">
              {/* Add to Mixed Container */}
              <button
                onClick={() => onToggleContainer(product)}
                className={`flex-1 py-3.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-md'
                    : 'bg-stone-900 dark:bg-[#D4B37F] hover:bg-stone-800 dark:hover:bg-[#E8CA9B] text-white dark:text-stone-950 shadow-md'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t('modal_in_container')}</span>
                  </>
                ) : (
                  <>
                    <Box className="w-4 h-4" />
                    <span>{t('modal_add')}</span>
                  </>
                )}
              </button>

              {/* Direct WhatsApp Instant Quote */}
              <a
                href={`https://wa.me/903523114619?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('btn_whatsapp_quote')}</span>
              </a>
            </div>

            <p className="text-center text-[10px] text-stone-400 dark:text-stone-500">
              Fast response from our Kayseri export desk &bull; Mixed container consolidation available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

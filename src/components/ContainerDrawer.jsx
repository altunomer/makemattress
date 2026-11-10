import React, { useState, useEffect } from 'react';
import { X, Trash2, Box, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function ContainerDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClear,
  activeLang = 'en'
}) {
  const [targetPort, setTargetPort] = useState('');
  const [companyName, setCompanyName] = useState('');
  const t = (key) => getTranslation(key, activeLang);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Plain-text formatted list specifically for WhatsApp
  const textSummary = items.map(i => `• ${i.name} (Ref: ${i.slug})`).join('\n');
  const whatsappMsg = encodeURIComponent(
    `Hello MakeMattress,\nI am requesting a quotation for the following mattress components from Kayseri:\n\n${textSummary}\n\nTarget Port: ${targetPort || 'Pending'}\nCompany: ${companyName || 'Not specified'}\nPlease share CIF/FOB pricing and lead times.`
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 dark:bg-black/70 flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF8F4] dark:bg-[#121217] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200/80 dark:border-white/10 relative animate-slide-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Specular line down the left border */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/50 dark:via-white/20 to-transparent"></div>

        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200/70 dark:border-white/[0.08] flex items-center justify-between backdrop-blur-md bg-stone-100/50 dark:bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 dark:bg-[#D4B37F] text-white dark:text-stone-950 flex items-center justify-center shadow-md">
              <Box className="w-5 h-5 text-[#D8CFBF] dark:text-stone-950" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
                {t('drawer_header_title')}
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {t('drawer_header_subtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items List with Sleek Aesthetic Scrollbar */}
        <div className="p-6 flex-1 overflow-y-auto dropdown-scrollbar space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-3xl backdrop-blur-md bg-stone-100 dark:bg-white/[0.04] border border-stone-200 dark:border-white/10 flex items-center justify-center mx-auto text-stone-400">
                <Box className="w-8 h-8 stroke-[1.4]" />
              </div>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{t('drawer_empty_title')}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto leading-relaxed">
                {t('drawer_empty_desc')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-stone-500 dark:text-stone-400">
                <span className="font-semibold text-stone-800 dark:text-stone-200">{items.length} {t('drawer_selected_count')}</span>
                <button
                  onClick={onClear}
                  className="text-xs text-red-500 hover:underline cursor-pointer font-medium"
                >
                  {t('drawer_clear_all')}
                </button>
              </div>

              {/* Visual Component Cards */}
              {items.map(item => {
                const localizedItemName = item.translations?.[activeLang]?.name || item.name;
                const localizedItemSubtitle = item.translations?.[activeLang]?.subtitle || item.subtitle;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/[0.08] flex items-center gap-3.5 shadow-2xs hover:border-[#8C7A58] dark:hover:border-[#D4B37F] transition-all"
                  >
                    <img
                      src={item.thumb}
                      alt={localizedItemName}
                      className="w-14 h-14 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200/80 dark:border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {localizedItemName}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                        {localizedItemSubtitle}
                      </p>
                      <span className="inline-block mt-1 text-[11px] uppercase font-semibold text-[#8C7A58] dark:text-[#D4B37F] bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        {item.moqInfo || t('moq_consolidated')}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              {/* Port & Company Inputs */}
              <div className="pt-4 border-t border-stone-200/70 dark:border-white/[0.08] space-y-3">
                <div>
                  <label className="block text-xs font-semibold tracking-wide text-stone-700 dark:text-stone-300 mb-1.5">
                    {t('drawer_port_label')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('drawer_port_placeholder')}
                    value={targetPort}
                    onChange={e => setTargetPort(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wide text-stone-700 dark:text-stone-300 mb-1.5">
                    {t('drawer_company_label')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('drawer_company_placeholder')}
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Actions */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-200/70 dark:border-white/[0.08] backdrop-blur-md bg-stone-100/50 dark:bg-white/[0.03] space-y-3">
            {/* Plain-text WhatsApp Action */}
            <a
              href={`https://wa.me/903523114619?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('drawer_btn_whatsapp')}</span>
            </a>

            {/* Scroll to RFQ Form where visual cards are displayed */}
            <button
              onClick={() => {
                onClose();
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 px-4 rounded-full bg-stone-900 dark:bg-[#D4B37F] hover:bg-stone-800 dark:hover:bg-[#E8CA9B] text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>{t('drawer_btn_quote')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C4A46D] dark:text-stone-950" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

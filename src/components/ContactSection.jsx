import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Box, Trash2 } from 'lucide-react';
import { companyData } from '../data/initialData';
import { getTranslation } from '../data/translations';

export default function ContactSection({ containerItems, onRemoveContainerItem, activeLang = 'en' }) {
  const [submitted, setSubmitted] = useState(false);
  const t = (key) => getTranslation(key, activeLang);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    phone: '',
    subject: 'Mixed Container Quotation Request',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello MakeMattress team, I am interested in sourcing mattress components from Kayseri.\n${
      containerItems.length > 0
        ? `Selected Components for Mixed Container:\n${containerItems.map(i => `• ${i.name} (${i.slug})`).join('\n')}`
        : 'Please send your general export catalog and pricing.'
    }`
  );

  return (
    <section id="contact" className="py-12 sm:py-16 relative z-10 border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-stone-900 dark:text-stone-100 font-medium tracking-tight">
            {t('rfq_title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-normal">
            {t('rfq_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Open Contact Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="divide-y divide-stone-200/70 dark:divide-white/[0.06] border-t border-b border-stone-200/70 dark:border-white/[0.06]">
              {/* Address */}
              <div className="py-4 flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-0.5">
                    {t('contact_hq_title')}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {companyData.address}
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="py-4 flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-0.5">
                    {t('contact_phone_title')}
                  </h3>
                  <a
                    href={`tel:${companyData.phone}`}
                    className="text-xs font-medium text-stone-900 dark:text-stone-100 hover:text-[#8C7A58] dark:hover:text-[#D4B37F] block"
                  >
                    {companyData.phone}
                  </a>
                  <a
                    href={`https://wa.me/903523114619?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline mt-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t('contact_whatsapp_cta')}</span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="py-4 flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-0.5">
                    {t('contact_email_title')}
                  </h3>
                  <a
                    href={`mailto:${companyData.email}`}
                    className="text-xs font-medium text-stone-900 dark:text-stone-100 hover:text-[#8C7A58] dark:hover:text-[#D4B37F]"
                  >
                    {companyData.email}
                  </a>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {t('contact_reply_time')}
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-xl overflow-hidden border border-stone-200/80 dark:border-white/[0.08] h-52">
              <iframe
                src={companyData.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="MakeMattress Location"
              />
            </div>
          </div>

          {/* Right: Working RFQ Form with Container Product Cards */}
          <div className="lg:col-span-7 bg-white/90 dark:bg-[#121216]/90 border border-stone-200/80 dark:border-white/[0.08] p-7 sm:p-10 rounded-2xl shadow-sm space-y-6 relative overflow-hidden">

            <div className="border-b border-stone-200/60 dark:border-white/[0.08] pb-4">
              <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-semibold">
                {t('rfq_title')}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                {t('rfq_subtitle')}
              </p>
            </div>

            {/* Visual Container Product Cards in Quote Request */}
            {containerItems.length > 0 && (
              <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-white/[0.03] border border-stone-200/70 dark:border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                      {t('form_items_heading')} ({containerItems.length})
                    </span>
                  </div>
                  <span className="text-xs text-[#8C7A58] dark:text-[#D4B37F] font-semibold">Bypass MOQ</span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                  {containerItems.map(item => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-white dark:bg-white/[0.05] border border-stone-200/70 dark:border-white/[0.08] flex items-center gap-3 relative group hover:border-[#8C7A58] dark:hover:border-[#D4B37F] transition-colors"
                    >
                      <img
                        src={item.thumb}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200/70 dark:border-white/10"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                          {item.name}
                        </h5>
                        <p className="text-xs text-stone-600 dark:text-stone-400 truncate">
                          {item.subtitle}
                        </p>
                        <span className="inline-block text-[11px] uppercase font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mt-0.5">
                          {item.moqInfo || "Export Grade"}
                        </span>
                      </div>

                      {onRemoveContainerItem && (
                        <button
                          type="button"
                          onClick={() => onRemoveContainerItem(item.id)}
                          className="text-stone-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                          title="Remove from quote"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {submitted ? (
              <div className="py-10 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-semibold">
                  {t('rfq_submitted_title') || "Quotation Request Received"}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
                  {t('rfq_submitted_desc') || "Our Kayseri export desk will review your component volumes and reply with a complete container stowage plan within 24 hours."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-[#D4B37F] text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {t('send_another') || "Send Another Inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-stone-700 dark:text-stone-300 mb-1.5">
                      {t('form_name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe / Bedding Co."
                      className="w-full px-4 py-2.5 rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-stone-700 dark:text-stone-300 mb-1.5">
                      {t('form_email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="purchasing@company.com"
                      className="w-full px-4 py-2.5 rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-stone-700 dark:text-stone-300 mb-1.5">
                      {t('form_port')}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. DreamBed Ltd (Hamburg Port, CIF)"
                      className="w-full px-4 py-2.5 rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-stone-700 dark:text-stone-300 mb-1.5">
                      {t('form_phone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+90 555 ... / +49 ..."
                      className="w-full px-4 py-2.5 rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide text-stone-700 dark:text-stone-300 mb-1.5">
                    {t('form_notes')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify estimated quantities (e.g. 10,000 meters of 38mm mattress tape, 2 tons hotmelt, 500 pillows)..."
                    className="w-full px-4 py-2.5 rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-stone-900 dark:bg-[#D4B37F] hover:bg-stone-800 dark:hover:bg-[#E8CA9B] text-white dark:text-stone-950 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D4B37F] dark:text-stone-900" />
                  <span>{t('form_submit')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

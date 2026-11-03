import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Box, Trash2, Sparkles } from 'lucide-react';
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
    <section id="contact" className="py-24 relative z-10 border-b border-stone-200/70 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-stone-200/50 dark:bg-white/[0.06] border border-stone-300/60 dark:border-white/10 text-[#8C7A58] dark:text-[#D4B37F] text-[10px] uppercase font-bold tracking-[0.25em]">
            <Sparkles className="w-3 h-3" />
            <span>{t('rfq_badge')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal">
            {t('rfq_title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light">
            {t('rfq_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Map */}
          <div className="lg:col-span-5 space-y-5">
            {/* Address */}
            <div className="liquid-glass flex items-start gap-4 p-5 rounded-3xl">
              <div className="w-11 h-11 rounded-2xl backdrop-blur-md bg-stone-100 dark:bg-white/[0.06] border border-stone-200/80 dark:border-white/10 flex items-center justify-center text-[#8C7A58] dark:text-[#D4B37F] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-1">
                  {t('contact_hq_title')}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {companyData.address}
                </p>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="liquid-glass flex items-start gap-4 p-5 rounded-3xl">
              <div className="w-11 h-11 rounded-2xl backdrop-blur-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-1">
                  {t('contact_phone_title')}
                </h4>
                <a
                  href={`tel:${companyData.phone}`}
                  className="text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-[#8C7A58] dark:hover:text-[#D4B37F] block"
                >
                  {companyData.phone}
                </a>
                <a
                  href={`https://wa.me/903523114619?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mt-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t('contact_whatsapp_cta')}</span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="liquid-glass flex items-start gap-4 p-5 rounded-3xl">
              <div className="w-11 h-11 rounded-2xl backdrop-blur-md bg-stone-100 dark:bg-white/[0.06] border border-stone-200/80 dark:border-white/10 flex items-center justify-center text-[#8C7A58] dark:text-[#D4B37F] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-1">
                  {t('contact_email_title')}
                </h4>
                <a
                  href={`mailto:${companyData.email}`}
                  className="text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-[#8C7A58] dark:hover:text-[#D4B37F]"
                >
                  {companyData.email}
                </a>
                <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
                  {t('contact_reply_time')}
                </p>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-stone-200/80 dark:border-white/10 shadow-lg h-56 liquid-glass">
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
          <div className="lg:col-span-7 liquid-glass-elevated p-7 sm:p-10 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
            {/* Top specular reflection */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent"></div>

            <div className="border-b border-stone-200/60 dark:border-white/[0.08] pb-4">
              <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-semibold">
                Submit Quotation Request
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Tell us your target volumes or destination port. We provide single-invoice mixed container allocations.
              </p>
            </div>

            {/* Visual Container Product Cards in Quote Request */}
            {containerItems.length > 0 && (
              <div className="p-4 rounded-2xl backdrop-blur-xl bg-stone-100/60 dark:bg-white/[0.03] border border-stone-200/70 dark:border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-[#8C7A58] dark:text-[#D4B37F]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                      Included in Your Mixed Container Plan ({containerItems.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8C7A58] dark:text-[#D4B37F] font-semibold">Bypass MOQ</span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                  {containerItems.map(item => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-white/[0.05] border border-stone-200/70 dark:border-white/[0.08] flex items-center gap-3 relative shadow-2xs group hover:border-[#8C7A58] dark:hover:border-[#D4B37F] transition-all"
                    >
                      <img
                        src={item.thumb}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200/70 dark:border-white/10"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[11px] font-bold text-stone-900 dark:text-stone-100 truncate">
                          {item.name}
                        </h5>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                          {item.subtitle}
                        </p>
                        <span className="inline-block text-[9px] uppercase font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded mt-0.5">
                          {item.moqInfo || "Export Grade"}
                        </span>
                      </div>

                      {onRemoveContainerItem && (
                        <button
                          type="button"
                          onClick={() => onRemoveContainerItem(item.id)}
                          className="text-stone-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                          title="Remove from quote"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
                  Quotation Request Received
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
                  Our Kayseri export desk will review your component volumes and reply with a complete container stowage plan within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-[#D4B37F] text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                      Corporate Email *
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
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                      Company & Destination Port
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. DreamBed Ltd (Hamburg Port)"
                      className="w-full px-4 py-2.5 rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+49 ..."
                      className="w-full px-4 py-2.5 rounded-2xl backdrop-blur-md bg-stone-50/70 dark:bg-white/[0.04] border border-stone-200/80 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#8C7A58] dark:focus:border-[#D4B37F] transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                    Special Requirements & Estimated Quantities
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
                  <span>Send Quotation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

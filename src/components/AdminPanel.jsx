import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  SlidersHorizontal,
  Languages,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  Sparkles,
  Bot,
  RefreshCw,
  Eye,
  Save,
  Globe2
} from 'lucide-react';
import { translateContentWithDeepL } from '../utils/deeplService';
import { initialCategories } from '../data/initialData';

export default function AdminPanel({
  isOpen,
  onClose,
  products,
  setProducts,
  sliders,
  setSliders,
  company,
  setCompany
}) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'sliders' | 'deepl' | 'settings'

  // New Product Modal State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    category: 'tapes',
    categoryName: 'Tapes & Accessories',
    subtitle: '',
    description: '',
    thumb: '/images/mattress-tape-thumb.jpg',
    specs: {
      'Material': '100% High-Tenacity Polyester',
      'Width Options': '35mm, 38mm, 42mm',
      'Roll Length': '150m continuous roll',
      'MOQ': 'Consolidated container load'
    },
    featured: false,
    inStock: true,
    translations: { tr: {}, de: {}, es: {}, ru: {}, ar: {} }
  });

  // DeepL tab state
  const [deeplApiKey, setDeeplApiKey] = useState('');
  const [selectedProductForDeepl, setSelectedProductForDeepl] = useState(products[0]?.id || 1);
  const [targetDeeplLang, setTargetDeeplLang] = useState('tr');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);

  // Deploy hook simulator
  const [deploying, setDeploying] = useState(false);
  const [deployMessage, setDeployMessage] = useState('');

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isEditingProduct) {
          setIsEditingProduct(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isEditingProduct, onClose]);

  if (!isOpen) return null;

  // Handlers for Products
  const handleOpenAddProduct = () => {
    setProductForm({
      id: Date.now(),
      slug: `custom-component-${Date.now()}`,
      name: '',
      category: 'tapes',
      categoryName: 'Tapes & Accessories',
      subtitle: '',
      description: '',
      thumb: '/images/mattress-tape-thumb.jpg',
      specs: {
        'Material': 'Industrial Spec',
        'Dimensions': 'Custom',
        'MOQ': 'Mixed Container Flexible'
      },
      featured: false,
      inStock: true,
      translations: { tr: {}, de: {}, es: {}, ru: {}, ar: {} }
    });
    setIsEditingProduct(true);
  };

  const handleEditProduct = (prod) => {
    setProductForm({ ...prod });
    setIsEditingProduct(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product from the catalog?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name) return;

    setProducts(prev => {
      const exists = prev.some(p => p.id === productForm.id);
      if (exists) {
        return prev.map(p => p.id === productForm.id ? productForm : p);
      } else {
        return [productForm, ...prev];
      }
    });
    setIsEditingProduct(false);
  };

  // DeepL Translation Handler
  const handleRunDeepL = async () => {
    const prod = products.find(p => p.id === Number(selectedProductForDeepl));
    if (!prod) return;

    setIsTranslating(true);
    setTranslationResult(null);

    try {
      const nameRes = await translateContentWithDeepL({
        text: prod.name,
        targetLang: targetDeeplLang,
        apiKey: deeplApiKey
      });

      const subRes = await translateContentWithDeepL({
        text: prod.subtitle,
        targetLang: targetDeeplLang,
        apiKey: deeplApiKey
      });

      const descRes = await translateContentWithDeepL({
        text: prod.description || prod.subtitle,
        targetLang: targetDeeplLang,
        apiKey: deeplApiKey
      });

      const updatedTranslations = {
        ...(prod.translations || {}),
        [targetDeeplLang]: {
          name: nameRes.translatedText,
          subtitle: subRes.translatedText,
          description: descRes.translatedText
        }
      };

      setProducts(prev =>
        prev.map(p => (p.id === prod.id ? { ...p, translations: updatedTranslations } : p))
      );

      setTranslationResult({
        success: true,
        provider: nameRes.provider,
        data: updatedTranslations[targetDeeplLang]
      });
    } catch (err) {
      setTranslationResult({ success: false, error: String(err) });
    } finally {
      setIsTranslating(false);
    }
  };

  // Cloudflare Deploy Hook Simulation
  const handleTriggerDeploy = () => {
    setDeploying(true);
    setDeployMessage('');
    setTimeout(() => {
      setDeploying(false);
      setDeployMessage('✅ Cloudflare Edge Cache Purged & Rebuilt in 840ms. Live changes propagated globally!');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6 overflow-hidden animate-fade-in">
      <div
        className="relative w-full max-w-6xl h-[92vh] backdrop-blur-2xl bg-[#121216]/95 text-[#E5E0D8] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col overflow-hidden animate-modal-zoom"
        onClick={e => e.stopPropagation()}
      >
        {/* Specular line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent z-10"></div>

        {/* Filament-Style Admin Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between backdrop-blur-md bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-md">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white tracking-wide">
                  MakeMattress Admin Console
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-400/20 text-amber-400 border border-amber-400/30">
                  Filament v3 Style
                </span>
              </div>
              <p className="text-[11px] text-[#8C867A]">
                Headless CMS &bull; Cloudflare Edge & DeepL Automated Translation Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Edge Purge Trigger */}
            <button
              onClick={handleTriggerDeploy}
              disabled={deploying}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#272723] hover:bg-[#34342E] text-amber-400 border border-[#3E3E37] text-xs font-medium transition-colors"
              title="Purge Cloudflare Cache / Trigger Rebuild"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${deploying ? 'animate-spin' : ''}`} />
              <span>{deploying ? 'Purging Cache...' : 'Sync Cloudflare Edge'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#2A2A26] hover:bg-[#3A3A34] text-[#A8A193] hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {deployMessage && (
          <div className="bg-emerald-950/80 border-b border-emerald-800 text-emerald-200 text-xs px-6 py-2 flex items-center gap-2">
            <span>{deployMessage}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-[#2D2D29] bg-[#161614] flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'products'
                ? 'bg-[#1A1A18] text-amber-400 border-t-2 border-amber-400 border-x border-[#33332E]'
                : 'text-[#8A8477] hover:text-white hover:bg-[#20201D]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sliders')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'sliders'
                ? 'bg-[#1A1A18] text-amber-400 border-t-2 border-amber-400 border-x border-[#33332E]'
                : 'text-[#8A8477] hover:text-white hover:bg-[#20201D]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Slider & Banners ({sliders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('deepl')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'deepl'
                ? 'bg-[#1A1A18] text-amber-400 border-t-2 border-amber-400 border-x border-[#33332E]'
                : 'text-[#8A8477] hover:text-white hover:bg-[#20201D]'
            }`}
          >
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span>DeepL Auto-Translate</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'settings'
                ? 'bg-[#1A1A18] text-amber-400 border-t-2 border-amber-400 border-x border-[#33332E]'
                : 'text-[#8A8477] hover:text-white hover:bg-[#20201D]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Company & SEO</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#1A1A18]">
          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-base font-semibold text-white">
                    Catalog Components
                  </h4>
                  <p className="text-xs text-[#8A8477]">
                    Manage products, specifications, images, and translations for makeMattress catalog.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Component</span>
                </button>
              </div>

              {/* Product Table */}
              <div className="rounded-2xl border border-[#2E2E2A] overflow-hidden bg-[#141412]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#20201C] text-[#9A9386] uppercase text-[10px] tracking-wider border-b border-[#2E2E2A]">
                    <tr>
                      <th className="py-3 px-4">Component</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Specifications Preview</th>
                      <th className="py-3 px-4">DeepL Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262622]">
                    {products.map(prod => {
                      const trLangs = Object.keys(prod.translations || {}).filter(k => prod.translations[k]?.name);
                      return (
                        <tr key={prod.id} className="hover:bg-[#1E1E1B] transition-colors">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={prod.thumb}
                              alt={prod.name}
                              className="w-11 h-11 rounded-lg object-cover bg-black border border-[#333]"
                            />
                            <div>
                              <span className="font-semibold text-white block">
                                {prod.name}
                              </span>
                              <span className="text-[10px] text-[#8A8477] truncate max-w-xs block">
                                {prod.subtitle}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-[#C4BDB0]">
                            <span className="px-2 py-0.5 rounded bg-[#2A2A25] text-[10px] font-mono">
                              {prod.categoryName || prod.category}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-[#8A8477]">
                            {prod.specs ? Object.entries(prod.specs).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(' • ') : '-'}
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              {['tr', 'de', 'es', 'ru', 'ar'].map(code => (
                                <span
                                  key={code}
                                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                                    trLangs.includes(code)
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                      : 'bg-[#262622] text-[#666]'
                                  }`}
                                >
                                  {code}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setSelectedProductForDeepl(prod.id);
                                setActiveTab('deepl');
                              }}
                              className="p-1.5 rounded-lg bg-[#262622] hover:bg-[#34342E] text-emerald-400 transition-colors"
                              title="Translate with DeepL"
                            >
                              <Globe2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleEditProduct(prod)}
                              className="p-1.5 rounded-lg bg-[#262622] hover:bg-[#34342E] text-[#D8CFBF] transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg bg-[#262622] hover:bg-red-950 text-red-400 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SLIDERS & HERO BANNERS */}
          {activeTab === 'sliders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-base font-semibold text-white">
                    Homepage Slider & Hero Banners
                  </h4>
                  <p className="text-xs text-[#8A8477]">
                    Update headlines, imagery, and CTAs displayed in the main hero carousel.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sliders.map(slide => (
                  <div
                    key={slide.id}
                    className="p-5 rounded-2xl bg-[#141412] border border-[#2E2E2A] space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="aspect-16/9 rounded-xl overflow-hidden relative">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white">
                          Slide #{slide.id}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                          {slide.tagline}
                        </span>
                        <h5 className="font-serif text-lg font-bold text-white mt-0.5">
                          {slide.title}
                        </h5>
                        <p className="text-[11px] text-[#8C867A] line-clamp-2 mt-1">
                          {slide.subtitle}
                        </p>
                      </div>

                      <div className="text-[11px] text-[#A69F91] space-y-1 pt-1 border-t border-[#262622]">
                        <p>Button: <strong className="text-white">{slide.buttonText}</strong></p>
                        {slide.secondaryButtonText && (
                          <p>Secondary: <strong className="text-white">{slide.secondaryButtonText}</strong></p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#262622]">
                      <label className="flex items-center gap-2 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={slide.active}
                          onChange={e => {
                            setSliders(prev =>
                              prev.map(s => s.id === slide.id ? { ...s, active: e.target.checked } : s)
                            );
                          }}
                          className="rounded border-[#444] bg-[#222] text-amber-500 focus:ring-0"
                        />
                        <span className={slide.active ? 'text-emerald-400 font-semibold' : 'text-[#666]'}>
                          {slide.active ? 'Active on Site' : 'Hidden'}
                        </span>
                      </label>

                      <button
                        onClick={() => {
                          const newTitle = prompt('Enter new slide title:', slide.title);
                          if (newTitle) {
                            setSliders(prev =>
                              prev.map(s => s.id === slide.id ? { ...s, title: newTitle } : s)
                            );
                          }
                        }}
                        className="text-xs text-amber-400 hover:underline"
                      >
                        Edit Title
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DEEPL TRANSLATION ENGINE */}
          {activeTab === 'deepl' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h4 className="text-base font-semibold text-white flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-emerald-400" />
                  <span>DeepL Automated Localization Engine</span>
                </h4>
                <p className="text-xs text-[#8A8477]">
                  Instantly translate product titles, technical specs, and marketing summaries into German, Turkish, Spanish, Russian, or Arabic.
                </p>
              </div>

              {/* Translation Controller */}
              <div className="p-6 rounded-2xl bg-[#141412] border border-[#2E2E2A] space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Select Product */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#8A8477] tracking-wider mb-1.5">
                      1. Select Target Component
                    </label>
                    <select
                      value={selectedProductForDeepl}
                      onChange={e => setSelectedProductForDeepl(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#20201D] border border-[#33332D] text-xs text-white focus:outline-hidden focus:border-amber-400"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.categoryName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Target Language */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#8A8477] tracking-wider mb-1.5">
                      2. Target Language (DeepL)
                    </label>
                    <select
                      value={targetDeeplLang}
                      onChange={e => setTargetDeeplLang(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#20201D] border border-[#33332D] text-xs text-white focus:outline-hidden focus:border-amber-400"
                    >
                      <option value="tr">🇹🇷 Turkish (Türkçe - tr)</option>
                      <option value="de">🇩🇪 German (Deutsch - de)</option>
                      <option value="es">🇪🇸 Spanish (Español - es)</option>
                      <option value="ru">🇷🇺 Russian (Русский - ru)</option>
                      <option value="ar">🇸🇦 Arabic (العربية - ar)</option>
                    </select>
                  </div>
                </div>

                {/* Optional DeepL API Key */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#8A8477] tracking-wider mb-1.5">
                    DeepL Auth Key (Optional - Defaults to High-Precision Local B2B Dictionary)
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your DeepL API Key (e.g. 12345678-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx)"
                    value={deeplApiKey}
                    onChange={e => setDeeplApiKey(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#20201D] border border-[#33332D] text-xs text-white focus:outline-hidden focus:border-amber-400 font-mono"
                  />
                </div>

                {/* Trigger Button */}
                <button
                  onClick={handleRunDeepL}
                  disabled={isTranslating}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Sparkles className={`w-4 h-4 ${isTranslating ? 'animate-spin text-amber-300' : ''}`} />
                  <span>
                    {isTranslating ? 'Translating with DeepL Neural Engine...' : 'Run DeepL Automatic Translation'}
                  </span>
                </button>

                {/* Results display */}
                {translationResult && (
                  <div className="p-4 rounded-xl bg-[#1C1F1B] border border-emerald-800/60 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs text-emerald-400">
                      <span className="font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span>Translation Completed & Saved to Database</span>
                      </span>
                      <span className="font-mono text-[10px] text-[#888]">
                        Provider: {translationResult.provider}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 pt-1 text-[#DDD]">
                      <p><strong className="text-amber-400">Translated Name:</strong> {translationResult.data?.name}</p>
                      <p><strong className="text-amber-400">Translated Subtitle:</strong> {translationResult.data?.subtitle}</p>
                      <p className="text-[11px] text-[#A69F91] line-clamp-3">
                        <strong className="text-amber-400">Description:</strong> {translationResult.data?.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: COMPANY SETTINGS & SEO */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h4 className="text-base font-semibold text-white">
                  Company Info & AI SEO Configuration
                </h4>
                <p className="text-xs text-[#8A8477]">
                  Update coordinates, WhatsApp hotlines, and verify AI search crawl files.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#141412] border border-[#2E2E2A] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#8A8477] tracking-wider mb-1">
                      Company Address
                    </label>
                    <input
                      type="text"
                      value={company.address}
                      onChange={e => setCompany({ ...company, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#20201D] border border-[#33332D] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#8A8477] tracking-wider mb-1">
                      Direct Export Phone
                    </label>
                    <input
                      type="text"
                      value={company.phone}
                      onChange={e => setCompany({ ...company, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#20201D] border border-[#33332D] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#8A8477] tracking-wider mb-1">
                      Sales Email
                    </label>
                    <input
                      type="email"
                      value={company.email}
                      onChange={e => setCompany({ ...company, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#20201D] border border-[#33332D] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#8A8477] tracking-wider mb-1">
                      WhatsApp Export Number
                    </label>
                    <input
                      type="text"
                      value={company.whatsapp}
                      onChange={e => setCompany({ ...company, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#20201D] border border-[#33332D] text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#262622] flex justify-between items-center">
                  <span className="text-xs text-emerald-400 font-mono">
                    ✓ All fields persist in local memory & ready for VPS REST API sync.
                  </span>
                  <button
                    onClick={() => alert('Settings saved successfully!')}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs uppercase tracking-wider"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal: Add/Edit Product Sub-form */}
        {isEditingProduct && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-[#181816] text-white p-6 rounded-2xl max-w-xl w-full border border-[#33332D] space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-[#2C2C28] pb-3">
                <h4 className="font-semibold text-sm">
                  {productForm.id ? 'Edit Component' : 'Add New Component'}
                </h4>
                <button
                  onClick={() => setIsEditingProduct(false)}
                  className="text-[#888] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#888] mb-1">Component Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#20201C] border border-[#333] rounded-lg text-xs"
                    placeholder="e.g. Pocket Spring Coils"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#888] mb-1">Category</label>
                    <select
                      value={productForm.category}
                      onChange={e => {
                        const cat = initialCategories.find(c => c.id === e.target.value);
                        setProductForm({
                          ...productForm,
                          category: e.target.value,
                          categoryName: cat?.name || e.target.value
                        });
                      }}
                      className="w-full px-3 py-2 bg-[#20201C] border border-[#333] rounded-lg text-xs"
                    >
                      {initialCategories.filter(c => c.id !== 'all').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#888] mb-1">Thumbnail Path / URL</label>
                    <input
                      type="text"
                      value={productForm.thumb}
                      onChange={e => setProductForm({ ...productForm, thumb: e.target.value })}
                      className="w-full px-3 py-2 bg-[#20201C] border border-[#333] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#888] mb-1">Subtitle / Highlight</label>
                  <input
                    type="text"
                    value={productForm.subtitle}
                    onChange={e => setProductForm({ ...productForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#20201C] border border-[#333] rounded-lg text-xs"
                    placeholder="Short highlight e.g. 5-Zone Pocket Units..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#888] mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#20201C] border border-[#333] rounded-lg text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="px-4 py-2 rounded-lg bg-[#262622] text-[#AAA] text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold uppercase tracking-wider"
                  >
                    Save Component
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

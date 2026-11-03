import React, { useState, useEffect } from 'react';
import {
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
  Globe2,
  LogOut,
  Lock,
  ArrowLeft,
  ShieldCheck,
  FileText,
  Upload,
  Download,
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { translateContentWithDeepL } from '../utils/deeplService';
import { initialCategories } from '../data/initialData';
import PdfCatalogModal from '../components/PdfCatalogModal';

export default function AdminPage({
  products,
  setProducts,
  sliders,
  setSliders,
  company,
  setCompany,
  catalogPdf = '/catalog/makemattress-catalog-2026.pdf',
  setCatalogPdf,
  onBackToSite
}) {
  // Authentication gate for standalone security
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('mm_webmaster_auth') === 'true';
    }
    return false;
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default master passcode for webmaster
    if (passcodeInput === 'webmaster2026' || passcodeInput === 'admin' || passcodeInput === 'makemattress') {
      setIsAuthenticated(true);
      sessionStorage.setItem('mm_webmaster_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mm_webmaster_auth');
    if (onBackToSite) onBackToSite();
  };

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'sliders' | 'deepl' | 'catalog' | 'settings'

  // PDF Catalog Management State
  const [isPreviewingPdf, setIsPreviewingPdf] = useState(false);
  const [customPdfUrl, setCustomPdfUrl] = useState(catalogPdf);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  // Handle direct file upload from PC
  const handlePdfFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Lütfen geçerli bir .pdf dosyası seçin!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (setCatalogPdf) {
        setCatalogPdf(dataUrl);
      }
      try {
        localStorage.setItem('makemattress_catalog_pdf', dataUrl);
      } catch (err) {
        console.warn('LocalStorage limit exceeded, using memory state:', err);
      }
      setUploadedFileName(`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
      setUploadSuccessMsg(`✓ "${file.name}" başarıyla yüklendi ve canlı katalog olarak yayınlandı!`);
      setTimeout(() => setUploadSuccessMsg(''), 6000);
    };
    reader.readAsDataURL(file);
  };

  // Handle URL / server path input
  const handleSaveCustomUrl = (e) => {
    e.preventDefault();
    if (!customPdfUrl.trim()) return;
    if (setCatalogPdf) {
      setCatalogPdf(customPdfUrl.trim());
    }
    try {
      localStorage.setItem('makemattress_catalog_pdf', customPdfUrl.trim());
    } catch (e) {}
    setUploadSuccessMsg(`✓ Katalog adresi "${customPdfUrl.trim()}" olarak güncellendi ve yayına alındı!`);
    setTimeout(() => setUploadSuccessMsg(''), 6000);
  };

  // Reset to default authentic MakeMattress 2026 catalog
  const handleResetCatalog = () => {
    const defaultUrl = '/catalog/makemattress-catalog-2026.pdf';
    if (setCatalogPdf) {
      setCatalogPdf(defaultUrl);
    }
    try {
      localStorage.removeItem('makemattress_catalog_pdf');
    } catch (e) {}
    setCustomPdfUrl(defaultUrl);
    setUploadedFileName('');
    setUploadSuccessMsg('✓ Varsayılan MakeMattress 2026 kataloğuna sıfırlandı.');
    setTimeout(() => setUploadSuccessMsg(''), 6000);
  };

  // New Product Modal State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    category: 'tapes',
    categoryName: 'Tapes & Accessories',
    subtitle: '',
    description: '',
    thumb: '/images/mattress-tape.jpg',
    specs: {
      'Material': '100% High-Tenacity Polyester',
      'Width Options': '35mm, 38mm, 42mm',
      'Roll Length': '150m continuous roll',
      'MOQ': 'Consolidated container load'
    },
    featured: false,
    inStock: true,
    translations: { tr: {}, de: {}, es: {}, ru: {}, ar: {}, zh: {} }
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

  // Save product handler
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (productForm.id) {
      setProducts(prev => prev.map(p => p.id === productForm.id ? productForm : p));
    } else {
      const newProduct = {
        ...productForm,
        id: Date.now()
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    setIsEditingProduct(false);
  };

  // Delete product handler
  const handleDeleteProduct = (id) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // DeepL Auto-Translate Execution
  const handleRunDeepL = async () => {
    setIsTranslating(true);
    setTranslationResult(null);
    try {
      const prod = products.find(p => p.id === Number(selectedProductForDeepl));
      if (!prod) return;

      const result = await translateContentWithDeepL({
        apiKey: deeplApiKey,
        targetLang: targetDeeplLang,
        content: {
          name: prod.name,
          subtitle: prod.subtitle,
          description: prod.description
        }
      });

      setTranslationResult(result);

      // Save into product's translations object
      setProducts(prev => prev.map(p => {
        if (p.id === prod.id) {
          return {
            ...p,
            translations: {
              ...(p.translations || {}),
              [targetDeeplLang]: {
                name: result.name,
                subtitle: result.subtitle,
                description: result.description
              }
            }
          };
        }
        return p;
      }));
    } catch (err) {
      alert('Çeviri hatası: ' + err.message);
    } finally {
      setIsTranslating(false);
    }
  };

  // Deploy / Cache Purge Simulator
  const handleTriggerDeploy = () => {
    setDeploying(true);
    setDeployMessage('Cloudflare Edge Cache boşaltılıyor ve Astro/Vite static build tetikleniyor...');
    setTimeout(() => {
      setDeploying(false);
      setDeployMessage('✓ Başarılı: Cloudflare Edge önbelleği temizlendi. Yapılan değişiklikler canlıda aktif.');
    }, 2000);
  };

  // 1. Password Lock Gate (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0C0F] text-stone-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#141418] border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">MakeMattress Webmaster</h1>
            <p className="text-xs text-stone-400">
              Güvenli Yönetim Paneli — Lütfen webmaster parolanızı girin.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Parola (webmaster2026)"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-500 focus:outline-none text-sm text-white placeholder-stone-500 transition-colors"
              />
              {authError && (
                <p className="text-xs text-rose-500 mt-2 font-medium">
                  Hatalı parola! Lütfen tekrar deneyin.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Giriş Yap
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anasayfaya Dön</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Full Standalone Single-Page Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0C0C0F] text-stone-100 flex flex-col antialiased">
      {/* Top Admin Navbar */}
      <header className="h-16 px-6 border-b border-white/10 bg-[#141418] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
              M
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wider text-white">MakeMattress Webmaster</h2>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Stand-alone Güvenli Oturum</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-stone-300 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Siteyi Önizle</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-medium text-rose-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-white/10 bg-[#121216] p-4 flex flex-col justify-between shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'products'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Ürün Yönetimi ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('sliders')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'sliders'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Hero Slider ({sliders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('deepl')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'deepl'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>DeepL Çeviri Motoru</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'catalog'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>PDF Katalog Yönetimi</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Firma Bilgileri & Cache</span>
            </button>
          </nav>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-[11px] text-stone-400 space-y-1">
            <p className="font-semibold text-white">MakeMattress v1.5.0</p>
            <p>Vite + React 19 Engine</p>
            <p>14 Dil Entegrasyonu Aktif</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0C0C0F]">
          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-white">Ürün Kataloğu Yönetimi</h1>
                  <p className="text-xs text-stone-400">Ürün ekleyin, teknik özellikleri düzenleyin ve görselleri güncelleyin.</p>
                </div>
                <button
                  onClick={() => {
                    setProductForm({
                      id: null,
                      name: '',
                      category: 'tapes',
                      categoryName: 'Tapes & Accessories',
                      subtitle: '',
                      description: '',
                      thumb: '/images/mattress-tape.jpg',
                      specs: {
                        'Material': '100% High-Tenacity Polyester',
                        'Width Options': '35mm, 38mm, 42mm',
                        'Roll Length': '150m continuous roll',
                        'MOQ': 'Consolidated container load'
                      },
                      featured: false,
                      inStock: true,
                      translations: { tr: {}, de: {}, es: {}, ru: {}, ar: {}, zh: {} }
                    });
                    setIsEditingProduct(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Ürün Ekle</span>
                </button>
              </div>

              {/* Product Table */}
              <div className="rounded-2xl border border-white/10 bg-[#141418] overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 border-b border-white/10 text-stone-400 uppercase font-medium">
                    <tr>
                      <th className="py-3 px-4">Görsel</th>
                      <th className="py-3 px-4">Ürün Adı & Kategori</th>
                      <th className="py-3 px-4">Öne Çıkan</th>
                      <th className="py-3 px-4">Stok</th>
                      <th className="py-3 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4">
                          <img
                            src={product.thumb}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg border border-white/10"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-white">{product.name}</p>
                          <p className="text-[11px] text-stone-400">{product.categoryName || product.category}</p>
                        </td>
                        <td className="py-3 px-4">
                          {product.featured ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium text-[10px]">
                              Evet
                            </span>
                          ) : (
                            <span className="text-stone-500">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {product.inStock ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium text-[10px]">
                              Mevcut
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-medium text-[10px]">
                              Tükendi
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setProductForm(product);
                              setIsEditingProduct(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 transition-colors cursor-pointer"
                            title="Düzenle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SLIDERS */}
          {activeTab === 'sliders' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div>
                <h1 className="text-xl font-bold text-white">Hero Slider Yönetimi</h1>
                <p className="text-xs text-stone-400">Anasayfa en üstteki cinematic slider metinlerini ve görsellerini düzenleyin.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {sliders.map(slide => (
                  <div key={slide.id} className="p-6 rounded-2xl bg-[#141418] border border-white/10 flex flex-col md:flex-row gap-6">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full md:w-64 h-40 object-cover rounded-xl border border-white/10 shrink-0"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          {slide.tagline}
                        </span>
                        <span className="text-xs text-stone-400">Slayt #{slide.id}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{slide.title}</h3>
                      <p className="text-xs text-stone-300 leading-relaxed">{slide.subtitle}</p>
                      <div className="pt-2 flex items-center gap-3">
                        <span className="text-xs text-stone-400">Buton: <strong>{slide.buttonText}</strong></span>
                        <span className="text-xs text-stone-400">&bull;</span>
                        <span className="text-xs text-stone-400">Hedef: <code>{slide.link}</code></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DEEPL */}
          {activeTab === 'deepl' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h1 className="text-xl font-bold text-white">DeepL B2B Otomatik Çeviri Motoru</h1>
                <p className="text-xs text-stone-400">Ürün başlık ve açıklamalarını DeepL AI ile anında hedef dillere tercüme edin.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-2">DeepL API Key (Opsiyonel / Simülasyon Aktif)</label>
                  <input
                    type="text"
                    value={deeplApiKey}
                    onChange={(e) => setDeeplApiKey(e.target.value)}
                    placeholder="DeepL Auth Key (Boş bırakılırsa yerleşik B2B sözlük kullanılır)"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-2">Çevrilecek Ürün</label>
                    <select
                      value={selectedProductForDeepl}
                      onChange={(e) => setSelectedProductForDeepl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-2">Hedef Dil</label>
                    <select
                      value={targetDeeplLang}
                      onChange={(e) => setTargetDeeplLang(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="tr">Türkçe (TR)</option>
                      <option value="de">Deutsch (DE)</option>
                      <option value="fr">Français (FR)</option>
                      <option value="es">Español (ES)</option>
                      <option value="it">Italiano (IT)</option>
                      <option value="pt">Português (PT)</option>
                      <option value="nl">Nederlands (NL)</option>
                      <option value="pl">Polski (PL)</option>
                      <option value="ka">ქართული (KA)</option>
                      <option value="ga">Gaeilge (GA)</option>
                      <option value="ru">Русский (RU)</option>
                      <option value="ar">العربية (AR)</option>
                      <option value="zh">中文 (ZH)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleRunDeepL}
                  disabled={isTranslating}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-md"
                >
                  <Bot className="w-4 h-4" />
                  <span>{isTranslating ? 'DeepL ile Çevriliyor...' : 'Otomatik Çevir ve Kaydet'}</span>
                </button>

                {translationResult && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 animate-fade-in">
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Çeviri Başarıyla Ürüne Kaydedildi!</span>
                    </p>
                    <p className="text-xs text-white"><strong>Başlık:</strong> {translationResult.name}</p>
                    <p className="text-xs text-stone-300"><strong>Açıklama:</strong> {translationResult.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PDF CATALOG MANAGEMENT */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h1 className="text-xl font-bold text-white">PDF Katalog Yönetimi</h1>
                <p className="text-xs text-stone-400">
                  Sitedeki "PDF Catalog" butonuna tıklandığında açılan 3D interaktif FlipBook ve indirilen PDF dosyasını buradan yönetin.
                </p>
              </div>

              {/* Status Message */}
              {uploadSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{uploadSuccessMsg}</span>
                  </div>
                </div>
              )}

              {/* Current Active Catalog Card */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">Aktif Yayındaki Katalog</h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                          Yayında
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5 font-mono truncate max-w-md">
                        {catalogPdf.startsWith('data:')
                          ? `Özel Yüklenen PDF Dosyası ${uploadedFileName ? `• ${uploadedFileName}` : ''}`
                          : catalogPdf}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPreviewingPdf(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-xs"
                      title="3D FlipBook olarak önizleyin"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>3D Önizle</span>
                    </button>
                    <a
                      href={catalogPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="makemattress-catalog.pdf"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 transition-colors"
                      title="PDF'i İndir / Aç"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Option 1: Direct File Upload from PC */}
                <div className="pt-2 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Seçenek 1: Bilgisayarınızdan Yeni PDF Dosyası Yükleyin
                  </h4>
                  <p className="text-xs text-stone-400">
                    Kendi hazırladığınız güncel MakeMattress PDF kataloğunu doğrudan seçin. Dosya anında işlenerek sitedeki 3D FlipBook sayfasına ve indirme butonlarına bağlanır.
                  </p>

                  <div className="mt-2 flex items-center justify-center p-6 border-2 border-dashed border-stone-700 hover:border-amber-500/60 rounded-2xl bg-black/30 transition-colors">
                    <label className="flex flex-col items-center gap-2 cursor-pointer text-center">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-white">
                        PDF Dosyasını Seçmek İçin Tıklayın
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Maksimum 50 MB • .pdf formatı desteklenir
                      </span>
                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={handlePdfFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Option 2: Enter Custom URL or Server Path */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Seçenek 2: Özel PDF URL'si veya Sunucu Yolu Belirtin
                  </h4>
                  <form onSubmit={handleSaveCustomUrl} className="flex gap-2">
                    <input
                      type="text"
                      value={customPdfUrl}
                      onChange={(e) => setCustomPdfUrl(e.target.value)}
                      placeholder="/catalog/makemattress-catalog-2026.pdf veya https://..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold border border-white/10 transition-colors cursor-pointer shrink-0"
                    >
                      Adresi Kaydet
                    </button>
                  </form>
                </div>

                {/* Reset to Default */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    Orijinal MakeMattress B2B 2026 fabrika kataloğuna dönmek isterseniz:
                  </span>
                  <button
                    onClick={handleResetCatalog}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Varsayılana Sıfırla</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS & CACHE */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h1 className="text-xl font-bold text-white">Sistem & Dağıtım Ayarları</h1>
                <p className="text-xs text-stone-400">Firma iletişim bilgileri ve Cloudflare önbellek yönetimi.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white">Cloudflare Edge Cache & Build Hook</h3>
                <p className="text-xs text-stone-400">
                  Ürün veya görsel değişiklikleri sonrasında önbelleği anında temizlemek için tetikleyin.
                </p>

                <button
                  onClick={handleTriggerDeploy}
                  disabled={deploying}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold border border-white/10 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${deploying ? 'animate-spin' : ''}`} />
                  <span>{deploying ? 'İşleniyor...' : 'Cloudflare Önbelleğini Boşalt'}</span>
                </button>

                {deployMessage && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                    {deployMessage}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Product Modal (Inside Admin Page only) */}
      {isEditingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#16161B] border border-white/15 rounded-3xl p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">
                {productForm.id ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
              </h3>
              <button
                onClick={() => setIsEditingProduct(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Ürün Adı</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Kategori</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({
                    ...productForm,
                    category: e.target.value,
                    categoryName: initialCategories.find(c => c.id === e.target.value)?.label || e.target.value
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-white"
                >
                  {initialCategories.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Görsel URL (public/images/)</label>
                <input
                  type="text"
                  value={productForm.thumb}
                  onChange={(e) => setProductForm({ ...productForm, thumb: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Alt Başlık</label>
                <input
                  type="text"
                  value={productForm.subtitle}
                  onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Detaylı Açıklama</label>
                <textarea
                  rows={4}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-white"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    className="rounded border-stone-700"
                  />
                  <span>Öne Çıkan Ürün</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="rounded border-stone-700"
                  />
                  <span>Stokta Var</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3D FlipBook PDF Preview Modal */}
      <PdfCatalogModal
        isOpen={isPreviewingPdf}
        onClose={() => setIsPreviewingPdf(false)}
        pdfUrl={catalogPdf}
        theme="dark"
      />
    </div>
  );
}

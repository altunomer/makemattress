import React, { useState, useEffect, useRef } from 'react';
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
  RotateCcw,
  Copy,
  Layers,
  Search,
  CheckSquare,
  Square,
  AlertCircle,
  Image as ImageIcon,
  EyeOff,
  LayoutGrid,
  Loader2,
  Zap
} from 'lucide-react';
import { translateContentWithDeepL } from '../utils/deeplService';
import { initialCategories } from '../data/initialData';
import { optimizeImageToWebP } from '../utils/imageOptimizer';
import {
  uploadPdfToLocalServer,
  savePdfToIndexedDB,
  clearPdfFromIndexedDB,
  getCatalogMetadata,
  DEFAULT_CATALOG_PATH
} from '../utils/pdfStorage';
import PdfCatalogModal from '../components/PdfCatalogModal';

export default function AdminPage({
  products,
  setProducts,
  categories = initialCategories,
  setCategories,
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

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput.trim() === 'dr4carys' && passwordInput === 'LetmeGetin010203*') {
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

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'categories' | 'sliders' | 'deepl' | 'catalog' | 'settings'

  // Product Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [bulkCategoryTarget, setBulkCategoryTarget] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Filtered visible products
  const visibleProducts = products.filter(p => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.subtitle || '').toLowerCase().includes(q) ||
      (p.categoryName || '').toLowerCase().includes(q)
    );
  });

  // Select all handler
  const handleSelectAll = () => {
    const visibleIds = visibleProducts.map(p => p.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every(id => selectedProductIds.includes(id));
    if (allSelected) {
      setSelectedProductIds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedProductIds(prev => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const handleToggleSelectProduct = (id) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Bulk duplicate (PaffiaBedding style with auto-increment ID & (Kopya) name)
  const handleBulkDuplicate = () => {
    if (selectedProductIds.length === 0) return;
    const toClone = products.filter(p => selectedProductIds.includes(p.id));
    const newItems = toClone.map(item => {
      const newId = `${item.id}-kopya-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      return {
        ...item,
        id: newId,
        name: `${item.name} (Kopya)`,
        featured: false
      };
    });
    const updated = [...products, ...newItems];
    setProducts(updated);
    try {
      localStorage.setItem('makemattress_custom_products', JSON.stringify(updated));
    } catch (e) {}
    setSelectedProductIds([]);
    showToast(`${newItems.length} ürün başarıyla kopyalandı ve kataloğa eklendi.`);
  };

  // Bulk category change
  const handleBulkCategoryChange = () => {
    if (selectedProductIds.length === 0 || !bulkCategoryTarget) return;
    const targetCatObj = (categories || initialCategories).find(c => c.id === bulkCategoryTarget);
    const updated = products.map(p => {
      if (selectedProductIds.includes(p.id)) {
        return {
          ...p,
          category: bulkCategoryTarget,
          categoryName: targetCatObj ? targetCatObj.name : p.categoryName
        };
      }
      return p;
    });
    setProducts(updated);
    try {
      localStorage.setItem('makemattress_custom_products', JSON.stringify(updated));
    } catch (e) {}
    setSelectedProductIds([]);
    setBulkCategoryTarget('');
    showToast(`${selectedProductIds.length} ürünün kategorisi güncellendi.`);
  };

  // Bulk toggle featured
  const handleBulktoggleFeatured = (val) => {
    if (selectedProductIds.length === 0) return;
    const updated = products.map(p =>
      selectedProductIds.includes(p.id) ? { ...p, featured: val } : p
    );
    setProducts(updated);
    try {
      localStorage.setItem('makemattress_custom_products', JSON.stringify(updated));
    } catch (e) {}
    showToast(`${selectedProductIds.length} ürünün öne çıkan durumu güncellendi.`);
  };

  // Bulk toggle inStock
  const handleBulkToggleStock = (val) => {
    if (selectedProductIds.length === 0) return;
    const updated = products.map(p =>
      selectedProductIds.includes(p.id) ? { ...p, inStock: val } : p
    );
    setProducts(updated);
    try {
      localStorage.setItem('makemattress_custom_products', JSON.stringify(updated));
    } catch (e) {}
    showToast(`${selectedProductIds.length} ürünün stok durumu güncellendi.`);
  };

  // Bulk delete
  const handleBulkDelete = () => {
    if (selectedProductIds.length === 0) return;
    if (!window.confirm(`Seçili ${selectedProductIds.length} ürünü silmek istediğinize emin misiniz?`)) return;
    const updated = products.filter(p => !selectedProductIds.includes(p.id));
    setProducts(updated);
    try {
      localStorage.setItem('makemattress_custom_products', JSON.stringify(updated));
    } catch (e) {}
    setSelectedProductIds([]);
    showToast(`${selectedProductIds.length} ürün silindi.`);
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Category', 'CategoryName', 'Subtitle', 'Description', 'Thumb', 'Featured', 'InStock'];
    const rows = products.map(p => [
      `"${p.id}"`,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${p.category || ''}"`,
      `"${(p.categoryName || '').replace(/"/g, '""')}"`,
      `"${(p.subtitle || '').replace(/"/g, '""')}"`,
      `"${(p.description || '').replace(/"/g, '""')}"`,
      `"${p.thumb || ''}"`,
      `"${p.featured ? 'true' : 'false'}"`,
      `"${p.inStock !== false ? 'true' : 'false'}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `makemattress-katalog-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Ürün kataloğu CSV olarak indirildi.');
  };

  // CSV File Import
  const csvFileInputRef = useRef(null);
  const handleImportCsv = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length <= 1) {
          alert('CSV dosyası boş veya sadece başlık satırından oluşuyor!');
          return;
        }

        const parseCsvLine = (line) => {
          const result = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
              } else {
                inQuotes = !inQuotes;
              }
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result;
        };

        const newProducts = [];
        let updatedCount = 0;
        let createdCount = 0;

        const currentMap = new Map(products.map(p => [String(p.id), { ...p }]));

        for (let i = 1; i < lines.length; i++) {
          const cells = parseCsvLine(lines[i]);
          if (cells.length < 2 || !cells[1]) continue;

          const rawId = cells[0] || `item-${Date.now()}-${i}`;
          const name = cells[1];
          const category = cells[2] || 'tapes';
          const categoryName = cells[3] || 'Tapes & Accessories';
          const subtitle = cells[4] || '';
          const description = cells[5] || '';
          const thumb = cells[6] || '/images/mattress-tape-color.jpg';
          const featured = cells[7] === 'true' || cells[7] === '1';
          const inStock = cells[8] !== 'false';

          if (currentMap.has(rawId)) {
            const existing = currentMap.get(rawId);
            currentMap.set(rawId, {
              ...existing,
              name,
              category,
              categoryName,
              subtitle,
              description,
              thumb,
              featured,
              inStock
            });
            updatedCount++;
          } else {
            currentMap.set(rawId, {
              id: rawId,
              name,
              category,
              categoryName,
              subtitle,
              description,
              thumb,
              specs: { 'Material': 'High-Tenacity Polyester', 'MOQ': 'Consolidated Container' },
              featured,
              inStock,
              translations: { tr: {}, de: {}, es: {}, ru: {}, ar: {}, zh: {} }
            });
            createdCount++;
          }
        }

        const merged = Array.from(currentMap.values());
        setProducts(merged);
        try {
          localStorage.setItem('makemattress_custom_products', JSON.stringify(merged));
        } catch (err) {}

        showToast(`CSV İçe Aktarıldı: ${createdCount} yeni ürün eklendi, ${updatedCount} ürün güncellendi.`);
      } catch (err) {
        alert('CSV işlenirken bir hata oluştu: ' + err.message);
      } finally {
        if (e.target) e.target.value = '';
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  // Quick Bulk Paste Modal
  const [showBulkPasteModal, setShowBulkPasteModal] = useState(false);
  const [bulkPasteText, setBulkPasteText] = useState('');
  const handleExecuteBulkPaste = () => {
    if (!bulkPasteText.trim()) return;
    const lines = bulkPasteText.trim().split(/\r?\n/).filter(Boolean);
    const added = lines.map((line, idx) => {
      // Split by tab or comma
      const parts = line.includes('\t') ? line.split('\t') : line.split(',');
      const name = (parts[0] || '').trim();
      const category = (parts[1] || 'tapes').trim();
      const subtitle = (parts[2] || '').trim();
      const thumb = (parts[3] || '/images/mattress-tape-color.jpg').trim();
      const catObj = (categories || initialCategories).find(c => c.id === category);

      return {
        id: `prod-${Date.now()}-${idx}`,
        name: name || `Yeni Ürün ${idx + 1}`,
        category: category,
        categoryName: catObj ? catObj.name : 'Tapes & Accessories',
        subtitle: subtitle || 'Endüstriyel Yatak Bileşeni',
        description: 'Kayseri üretim tesislerimizden B2B ihracata hazır yüksek kaliteli yatak bileşeni.',
        thumb: thumb,
        specs: { 'Material': 'Standard Grade', 'MOQ': 'Consolidated' },
        featured: false,
        inStock: true,
        translations: { tr: {}, de: {}, es: {}, ru: {}, ar: {}, zh: {} }
      };
    });

    const updated = [...products, ...added];
    setProducts(updated);
    try {
      localStorage.setItem('makemattress_custom_products', JSON.stringify(updated));
    } catch (e) {}
    setBulkPasteText('');
    setShowBulkPasteModal(false);
    showToast(`${added.length} ürün başarıyla eklendi!`);
  };

  // Category Management State
  const [catList, setCatList] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('makemattress_custom_categories');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return categories || initialCategories;
  });

  const [editingCatId, setEditingCatId] = useState(null);
  const [catOptimizing, setCatOptimizing] = useState(false);
  const [catOptStats, setCatOptStats] = useState(null);
  const [catFormData, setCatFormData] = useState({
    id: '',
    name: '',
    desc: '',
    badge: '',
    image: '/images/mattress-tape-color.jpg',
    icon: 'Layers',
    inMenu: true
  });

  const presetCategoryImages = [
    { label: 'Fitil & Kenar Biyesi', url: '/images/mattress-tape-color.jpg' },
    { label: 'Keçe & Tela', url: '/images/felt-color.jpg' },
    { label: 'Ambalaj & Film', url: '/images/pe-film-color.jpg' },
    { label: 'Tutkal & Hotmelt', url: '/images/hotmelts-thumb.jpg' },
    { label: 'Zımba Teli & Donanım', url: '/images/staples-color.jpg' },
    { label: 'Kulplar & Kapsüller', url: '/images/handles-color.jpg' },
    { label: 'Karton Köşebent', url: '/images/cardboard-color.jpg' },
    { label: 'Lojistik & Konteyner', url: '/images/slider-logistics.jpg' }
  ];

  const handleStartAddCategory = () => {
    setEditingCatId('new');
    setCatOptStats(null);
    setCatOptimizing(false);
    setCatFormData({
      id: '',
      name: '',
      desc: '',
      badge: '',
      image: '/images/mattress-tape-color.jpg',
      icon: 'Layers',
      inMenu: true
    });
  };

  const handleStartEditCategory = (cat) => {
    setEditingCatId(cat.id);
    setCatOptStats(null);
    setCatOptimizing(false);
    setCatFormData({
      id: cat.id,
      name: cat.name || '',
      desc: cat.desc || '',
      badge: cat.badge || '',
      image: cat.image || '/images/mattress-tape-color.jpg',
      icon: cat.icon || 'Layers',
      inMenu: cat.inMenu !== false
    });
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catFormData.name.trim()) {
      alert('Lütfen kategori adını girin!');
      return;
    }

    if (editingCatId === 'new') {
      const id = catFormData.id.trim() || catFormData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      if (catList.some(c => c.id === id)) {
        alert('Bu ID ile zaten bir kategori mevcut!');
        return;
      }
      const newCat = {
        ...catFormData,
        id,
        name: catFormData.name.trim(),
        desc: catFormData.desc.trim(),
        badge: catFormData.badge.trim(),
        image: catFormData.image.trim(),
        inMenu: catFormData.inMenu
      };
      const updated = [...catList, newCat];
      setCatList(updated);
      if (setCategories) setCategories(updated);
      try {
        localStorage.setItem('makemattress_custom_categories', JSON.stringify(updated));
      } catch (err) {}
      setEditingCatId(null);
      showToast(`"${newCat.name}" kategorisi başarıyla eklendi.`);
    } else {
      // Editing existing category
      const updated = catList.map(c => {
        if (c.id === editingCatId) {
          return {
            ...c,
            name: catFormData.name.trim(),
            desc: catFormData.desc.trim(),
            badge: catFormData.badge.trim(),
            image: catFormData.image.trim(),
            icon: catFormData.icon || c.icon,
            inMenu: catFormData.inMenu
          };
        }
        return c;
      });
      setCatList(updated);
      if (setCategories) setCategories(updated);
      try {
        localStorage.setItem('makemattress_custom_categories', JSON.stringify(updated));
      } catch (err) {}
      setEditingCatId(null);
      showToast(`"${catFormData.name}" kategorisi güncellendi.`);
    }
  };

  const handleToggleCategoryMenu = (catId) => {
    const updated = catList.map(c => {
      if (c.id === catId) {
        return { ...c, inMenu: c.inMenu === false ? true : false };
      }
      return c;
    });
    setCatList(updated);
    if (setCategories) setCategories(updated);
    try {
      localStorage.setItem('makemattress_custom_categories', JSON.stringify(updated));
    } catch (err) {}
    showToast('Menü görünürlüğü güncellendi.');
  };

  const handleDeleteCategory = (catId) => {
    if (catId === 'all') {
      alert('Tüm Bileşenler sistem kategorisidir, silinemez!');
      return;
    }
    if (!window.confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
    const updated = catList.filter(c => c.id !== catId);
    setCatList(updated);
    if (setCategories) setCategories(updated);
    try {
      localStorage.setItem('makemattress_custom_categories', JSON.stringify(updated));
    } catch (e) {}
    if (editingCatId === catId) setEditingCatId(null);
    showToast('Kategori silindi.');
  };

  const handleResetCategoriesToDefault = () => {
    if (!window.confirm('Tüm kategorileri ve mega menü ayarlarını varsayılana sıfırlamak istediğinize emin misiniz?')) return;
    setCatList(initialCategories);
    if (setCategories) setCategories(initialCategories);
    try {
      localStorage.removeItem('makemattress_custom_categories');
    } catch (e) {}
    setEditingCatId(null);
    showToast('Kategoriler varsayılana sıfırlandı.');
  };

  const handleCategoryImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCatOptimizing(true);
      setCatOptStats(null);
      const res = await optimizeImageToWebP(file, { maxWidth: 1200, maxHeight: 1200, quality: 0.82 });
      setCatFormData(prev => ({ ...prev, image: res.dataUrl }));
      setCatOptStats({
        original: res.originalSizeFormatted,
        optimized: res.optimizedSizeFormatted,
        savings: res.savingsPercent,
        format: res.format,
        dims: `${res.width}x${res.height}`
      });
      showToast(`Görsel WebP formatına optimize edildi: ${res.originalSizeFormatted} → ${res.optimizedSizeFormatted} (%${res.savingsPercent} tasarruf)`);
    } catch (err) {
      alert(`Görsel optimize edilirken hata oluştu: ${err.message}`);
    } finally {
      setCatOptimizing(false);
      e.target.value = '';
    }
  };

  // PDF Catalog Management State with IndexedDB & Local Server Disk Write
  const [isPreviewingPdf, setIsPreviewingPdf] = useState(false);
  const [customPdfUrl, setCustomPdfUrl] = useState(catalogPdf);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [pdfMeta, setPdfMeta] = useState(() => getCatalogMetadata());

  const handlePdfFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Lütfen geçerli bir .pdf dosyası seçin!');
      return;
    }

    try {
      setIsUploadingPdf(true);
      setUploadSuccessMsg('');

      // 1. Local Vite dev server: overwrite public/catalog/makemattress-catalog-2026.pdf directly on disk!
      const serverResult = await uploadPdfToLocalServer(file);

      // 2. Browser storage: persist to IndexedDB (survives refreshes, no 5MB limit!)
      await savePdfToIndexedDB(file, file.name);

      // 3. Create active Object URL for instant previewing & set as active catalog
      const objectUrl = URL.createObjectURL(file);
      if (setCatalogPdf) setCatalogPdf(objectUrl);

      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      const newMeta = {
        filename: file.name,
        size: file.size,
        sizeFormatted: `${sizeMb} MB`,
        updatedAt: Date.now(),
        serverSaved: serverResult.serverSaved
      };
      setPdfMeta(newMeta);
      setUploadedFileName(`${file.name} (${sizeMb} MB)`);

      if (serverResult.serverSaved) {
        setUploadSuccessMsg(`✓ "${file.name}" yüklendi! Proje diskine (public/catalog/) kalıcı olarak yazıldı ve yayına alındı.`);
      } else {
        setUploadSuccessMsg(`✓ "${file.name}" yüklendi! Tarayıcı kalıcı hafızasına (IndexedDB) kaydedildi ve yayına alındı.`);
      }
      showToast(`Yeni PDF katalog yüklendi (${sizeMb} MB).`);
    } catch (err) {
      console.error('PDF yükleme hatası:', err);
      alert(`PDF yüklenirken bir hata oluştu: ${err.message}`);
    } finally {
      setIsUploadingPdf(false);
      e.target.value = '';
    }
  };

  const handleResetPdfToDefault = async () => {
    if (!window.confirm('Özel yüklenen PDF kataloğu kaldırıp sistem varsayılanına dönmek istediğinize emin misiniz?')) return;
    await clearPdfFromIndexedDB();
    if (setCatalogPdf) setCatalogPdf(DEFAULT_CATALOG_PATH);
    setPdfMeta(null);
    setUploadedFileName('');
    setCustomPdfUrl(DEFAULT_CATALOG_PATH);
    setUploadSuccessMsg('Katalog varsayılan fabrika ayarına sıfırlandı.');
    showToast('Katalog varsayılana sıfırlandı.');
  };

  const handleSaveCustomUrl = (e) => {
    e.preventDefault();
    if (!customPdfUrl.trim()) return;
    if (setCatalogPdf) setCatalogPdf(customPdfUrl.trim());
    try {
      localStorage.setItem('makemattress_catalog_pdf', customPdfUrl.trim());
    } catch (e) {}
    setUploadSuccessMsg(`✓ Katalog adresi "${customPdfUrl.trim()}" olarak güncellendi ve yayına alındı!`);
    showToast('Katalog URL bağlantısı güncellendi.');
    setTimeout(() => setUploadSuccessMsg(''), 6000);
  };

  // Product edit modal form
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productForm, setProductForm] = useState(null);
  const [productOptimizing, setProductOptimizing] = useState(false);
  const [productOptStats, setProductOptStats] = useState(null);

  const handleProductImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setProductOptimizing(true);
      setProductOptStats(null);
      const res = await optimizeImageToWebP(file, { maxWidth: 1200, maxHeight: 1200, quality: 0.82 });
      setProductForm(prev => ({ ...prev, thumb: res.dataUrl }));
      setProductOptStats({
        original: res.originalSizeFormatted,
        optimized: res.optimizedSizeFormatted,
        savings: res.savingsPercent,
        format: res.format,
        dims: `${res.width}x${res.height}`
      });
      showToast(`Ürün görseli WebP formatına optimize edildi: ${res.originalSizeFormatted} → ${res.optimizedSizeFormatted} (%${res.savingsPercent} tasarruf)`);
    } catch (err) {
      alert(`Ürün görseli optimize edilirken hata oluştu: ${err.message}`);
    } finally {
      setProductOptimizing(false);
      e.target.value = '';
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm) return;

    let updatedProducts;
    if (productForm.id) {
      updatedProducts = products.map(p => p.id === productForm.id ? productForm : p);
    } else {
      const newId = `product-${Date.now()}`;
      updatedProducts = [{ ...productForm, id: newId }, ...products];
    }

    setProducts(updatedProducts);
    try {
      localStorage.setItem('makemattress_custom_products', JSON.stringify(updatedProducts));
    } catch (e) {}
    setIsEditingProduct(false);
    setProductForm(null);
    showToast('Ürün başarıyla kaydedildi.');
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    try {
      localStorage.setItem('makemattress_custom_products', JSON.stringify(updated));
    } catch (e) {}
    showToast('Ürün silindi.');
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
              Güvenli Yönetim Paneli — Lütfen webmaster bilgilerinizi girin.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">Kullanıcı Adı</label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Kullanıcı Adı"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-500 focus:outline-none text-sm text-white placeholder-stone-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">Parola</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Parola"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-500 focus:outline-none text-sm text-white placeholder-stone-500 transition-colors"
              />
              {authError && (
                <p className="text-xs text-rose-500 mt-2 font-medium">
                  Hatalı kullanıcı adı veya parola! Lütfen tekrar deneyin.
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
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-amber-500 text-stone-950 text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in transition-all">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

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
                <span>Stand-alone Güvenli Oturum (dr4carys)</span>
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
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'categories'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Kategori Yönetimi ({catList.length})</span>
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
            <p className="font-semibold text-white">MakeMattress Admin</p>
            <p>Vite + React 19 Engine</p>
            <p>14 Dil & CSV Entegrasyonu Aktif</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0C0C0F]">
          
          {/* ============================================================== */}
          {/* TAB 1: PRODUCT MANAGEMENT (PaffiaBedding Grade with Bulk & CSV) */}
          {/* ============================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              {/* Header & Main Toolbar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Ürün Kataloğu Yönetimi</h1>
                  <p className="text-xs text-stone-400">
                    Kataloğunuzu yönetin, toplu değişiklikler yapın, CSV formatında dışa aktarın veya içeri aktarın.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Export CSV Button */}
                  <button
                    onClick={handleExportCsv}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                    title="Mevcut kataloğu CSV olarak indirin"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV İndir</span>
                  </button>

                  {/* Import CSV Button */}
                  <input
                    type="file"
                    ref={csvFileInputRef}
                    onChange={handleImportCsv}
                    accept=".csv"
                    className="hidden"
                  />
                  <button
                    onClick={() => csvFileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                    title="CSV dosyasından toplu ürün yükleyin"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>CSV Yükle</span>
                  </button>

                  {/* Bulk Quick Paste Button */}
                  <button
                    onClick={() => setShowBulkPasteModal(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                    title="Excel'den kopyalayıp hızlıca yapıştırın"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Hızlı Toplu Ekle</span>
                  </button>

                  {/* Single Product Add */}
                  <button
                    onClick={() => {
                      setProductForm({
                        id: null,
                        name: '',
                        category: 'tapes',
                        categoryName: 'Tapes & Accessories',
                        subtitle: '',
                        description: '',
                        thumb: '/images/mattress-tape-color.jpg',
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
                      setProductOptStats(null);
                      setProductOptimizing(false);
                      setIsEditingProduct(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yeni Ürün</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#141418] border border-white/10">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Ürün adı, alt başlık veya SKU ara..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">Tüm Kategoriler ({products.length})</option>
                    {catList.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({products.filter(p => p.category === c.id).length})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* FLOATING / STICKY BULK ACTIONS BAR (PaffiaBedding Feature) */}
              {selectedProductIds.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-amber-300">
                      {selectedProductIds.length} ürün seçildi
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Bulk Category Change */}
                    <select
                      value={bulkCategoryTarget}
                      onChange={(e) => setBulkCategoryTarget(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-black/60 border border-stone-700 text-xs text-white"
                    >
                      <option value="">Kategori Seç...</option>
                      {catList.filter(c => c.id !== 'all').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleBulkCategoryChange}
                      disabled={!bulkCategoryTarget}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-xs cursor-pointer"
                    >
                      Kategori Değiştir
                    </button>

                    {/* Bulk Duplicate (Paffia Klonla) */}
                    <button
                      onClick={handleBulkDuplicate}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs cursor-pointer flex items-center gap-1"
                      title="Seçili ürünlerin kopyasını oluşturur"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Klonla / Çoğalt</span>
                    </button>

                    {/* Bulk Toggle Featured */}
                    <button
                      onClick={() => handleBulktoggleFeatured(true)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs cursor-pointer"
                    >
                      Öne Çıkar
                    </button>

                    {/* Bulk Toggle Stock */}
                    <button
                      onClick={() => handleBulkToggleStock(true)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-medium text-xs cursor-pointer"
                    >
                      Stokta Var
                    </button>

                    {/* Bulk Delete */}
                    <button
                      onClick={handleBulkDelete}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-medium text-xs cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Sil</span>
                    </button>

                    {/* Deselect All */}
                    <button
                      onClick={() => setSelectedProductIds([])}
                      className="px-2.5 py-1.5 text-xs text-stone-400 hover:text-white cursor-pointer"
                    >
                      Seçimi Kaldır
                    </button>
                  </div>
                </div>
              )}

              {/* Product Table */}
              <div className="rounded-2xl border border-white/10 bg-[#141418] overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 border-b border-white/10 text-stone-400 uppercase font-medium">
                    <tr>
                      <th className="py-3 px-4 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={visibleProducts.length > 0 && visibleProducts.every(p => selectedProductIds.includes(p.id))}
                          onChange={handleSelectAll}
                          className="rounded border-stone-700 cursor-pointer"
                        />
                      </th>
                      <th className="py-3 px-4">Görsel</th>
                      <th className="py-3 px-4">Ürün Adı & Kategori</th>
                      <th className="py-3 px-4">Öne Çıkan</th>
                      <th className="py-3 px-4">Stok</th>
                      <th className="py-3 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {visibleProducts.map(product => {
                      const isSelected = selectedProductIds.includes(product.id);

                      return (
                        <tr
                          key={product.id}
                          className={`hover:bg-white/[0.02] transition-colors ${isSelected ? 'bg-amber-500/[0.04]' : ''}`}
                        >
                          <td className="py-3 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelectProduct(product.id)}
                              className="rounded border-stone-700 cursor-pointer"
                            />
                          </td>
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
                            {product.inStock !== false ? (
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
                                setProductOptStats(null);
                                setProductOptimizing(false);
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: CATEGORY & MEGA MENU MANAGEMENT                         */}
          {/* ============================================================== */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-amber-500" />
                    <span>Kategori & Mega Menü Yönetimi</span>
                  </h1>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Navbar geniş mega dropdown menüsünde, ürün filtrelerinde ve katalogda görünen kategorileri, görselleri ve rozetleri düzenleyin.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetCategoriesToDefault}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Orijinal fabrika kategorilerine sıfırla"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Varsayılana Dön</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleStartAddCategory}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yeni Kategori Ekle</span>
                  </button>
                </div>
              </div>

              {/* Add / Edit Category Form Panel */}
              {editingCatId && (
                <form onSubmit={handleSaveCategory} className="p-6 rounded-2xl bg-[#141418] border border-amber-500/40 shadow-xl space-y-4 animate-fade-in relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                        {editingCatId === 'new' ? <Plus className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                      </div>
                      <h3 className="text-sm font-bold text-white">
                        {editingCatId === 'new' ? 'Yeni Kategori Oluştur' : `Kategoriyi Düzenle: ${catFormData.name || editingCatId}`}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingCatId(null)}
                      className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Kategori Adı *</label>
                      <input
                        type="text"
                        value={catFormData.name}
                        onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })}
                        placeholder="Örn: Yatak Fitilleri & Şeritler"
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Kategori ID / Slug
                        {editingCatId !== 'new' && <span className="text-[10px] text-stone-500 ml-1.5">(Sabit ID)</span>}
                      </label>
                      <input
                        type="text"
                        value={catFormData.id}
                        disabled={editingCatId !== 'new'}
                        onChange={(e) => setCatFormData({ ...catFormData, id: e.target.value })}
                        placeholder="Örn: tapes (otomatik oluşturulur)"
                        className={`w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono ${
                          editingCatId !== 'new' ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Katalog Rozeti (Badge)</label>
                      <input
                        type="text"
                        value={catFormData.badge}
                        onChange={(e) => setCatFormData({ ...catFormData, badge: e.target.value })}
                        placeholder="Örn: 100+ Desen, Yeni, Zero MOQ"
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Alt Başlık / Kısa Açıklama (Mega Menüde Görünen)</label>
                      <input
                        type="text"
                        value={catFormData.desc}
                        onChange={(e) => setCatFormData({ ...catFormData, desc: e.target.value })}
                        placeholder="Örn: Özel jakar dokuma kenar biyesi, fitiller, nakışlı kulplar..."
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">İkon Seçimi</label>
                      <select
                        value={catFormData.icon}
                        onChange={(e) => setCatFormData({ ...catFormData, icon: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="Ribbon">Ribbon (Şerit / Fitil)</option>
                        <option value="Sparkles">Sparkles (Kumaş / Keçe / Lüks)</option>
                        <option value="Package">Package (Ambalaj / PE Film)</option>
                        <option value="FlaskConical">FlaskConical (Tutkal / Kimyasal)</option>
                        <option value="Boxes">Boxes (Yay / Zımba / Metal)</option>
                        <option value="Layers">Layers (Genel / Tüm Bileşenler)</option>
                      </select>
                    </div>

                    {/* Image URL & File Upload with Automatic WebP Optimization */}
                    <div className="sm:col-span-3 space-y-2 p-3.5 rounded-2xl bg-black/30 border border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-stone-300">Mega Menü Görseli *</label>
                        <label className={`text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                          catOptimizing
                            ? 'bg-amber-500/20 text-amber-300 cursor-wait'
                            : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30'
                        }`}>
                          {catOptimizing ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>WebP Dönüştürülüyor...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5" />
                              <span>Bilgisayardan Yükle (Otomatik WebP)</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={catOptimizing}
                            onChange={handleCategoryImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* WebP Optimization Result Banner */}
                      {catOptStats && (
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] animate-fade-in">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <div className="flex-1">
                            <span className="font-bold">⚡ Otomatik WebP Optimizasyonu: </span>
                            <span>{catOptStats.original} → {catOptStats.optimized} </span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold ml-1">
                              %{catOptStats.savings} Tasarruf
                            </span>
                            <span className="text-emerald-400/70 ml-1">({catOptStats.dims})</span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        {/* Live Image Preview */}
                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-stone-900 border border-white/20 shrink-0 relative">
                          <img
                            src={catFormData.image || '/images/slider-logistics.jpg'}
                            alt="Önizleme"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/images/slider-logistics.jpg'; }}
                          />
                          {(catFormData.image?.startsWith('data:image/webp') || catOptStats) && (
                            <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-emerald-500 text-stone-950 font-black text-[8px] uppercase tracking-wider">
                              WEBP
                            </span>
                          )}
                        </div>

                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={catFormData.image}
                            onChange={(e) => {
                              setCatFormData({ ...catFormData, image: e.target.value });
                              setCatOptStats(null);
                            }}
                            placeholder="/images/mattress-tape-color.jpg veya https://..."
                            className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono"
                            required
                          />
                          <p className="text-[10px] text-stone-400 mt-1">
                            Dosya seçtiğinizde tarayıcınız görseli otomatik olarak sıkıştırıp yüksek verimli <strong>WebP</strong> formatına çevirir.
                          </p>
                        </div>
                      </div>

                      {/* Quick Preset Selector */}
                      <div className="pt-1 border-t border-white/5">
                        <p className="text-[10.5px] text-stone-400 mb-1.5">Hızlı Hazır Görseller:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {presetCategoryImages.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setCatFormData({ ...catFormData, image: preset.url });
                                setCatOptStats(null);
                              }}
                              className={`px-2 py-1 rounded-lg text-[10.5px] transition-colors cursor-pointer border ${
                                catFormData.image === preset.url
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                                  : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/5'
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mega Menu Toggle */}
                    <div className="sm:col-span-3 flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/10">
                      <div>
                        <p className="text-xs font-bold text-white">Mega Menüde Görüntülensin</p>
                        <p className="text-[11px] text-stone-400">Aktif olduğunda navbar'daki "Ürünler" açılır mega menüsünde kartı yer alır.</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={catFormData.inMenu}
                        onClick={() => setCatFormData({ ...catFormData, inMenu: !catFormData.inMenu })}
                        className={`w-12 h-6.5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                          catFormData.inMenu ? 'bg-amber-500' : 'bg-stone-700'
                        }`}
                      >
                        <div
                          className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform ${
                            catFormData.inMenu ? 'translate-x-5.5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditingCatId(null)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      {editingCatId === 'new' ? 'Kategoriyi Oluştur' : 'Değişiklikleri Kaydet'}
                    </button>
                  </div>
                </form>
              )}

              {/* Category List Cards & Table */}
              <div className="rounded-2xl border border-white/10 bg-[#141418] overflow-hidden shadow-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 border-b border-white/10 text-stone-400 uppercase font-medium">
                    <tr>
                      <th className="py-3 px-4">Görsel & Kategori</th>
                      <th className="py-3 px-4">ID / Slug</th>
                      <th className="py-3 px-4">Mega Menü</th>
                      <th className="py-3 px-4">Ürün Sayısı</th>
                      <th className="py-3 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {catList.map(cat => {
                      const count = products.filter(p => cat.id === 'all' || p.category === cat.id).length;
                      const isMenuVisible = cat.inMenu !== false;
                      const imgSrc = cat.image || presetCategoryImages[0].url;

                      return (
                        <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-9 rounded-lg overflow-hidden bg-stone-900 border border-white/15 shrink-0">
                                <img
                                  src={imgSrc}
                                  alt={cat.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { e.target.src = '/images/slider-logistics.jpg'; }}
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-white text-xs">{cat.name}</span>
                                  {cat.badge && (
                                    <span className="px-1.5 py-0.2 rounded-md bg-amber-500/15 text-amber-400 text-[9px] font-semibold uppercase">
                                      {cat.badge}
                                    </span>
                                  )}
                                </div>
                                {cat.desc && (
                                  <p className="text-[11px] text-stone-400 line-clamp-1 max-w-sm font-light mt-0.5">
                                    {cat.desc}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 font-mono text-stone-400">
                            <span className="px-2 py-1 rounded bg-black/40 border border-white/5 text-[11px]">
                              {cat.id}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleToggleCategoryMenu(cat.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                                isMenuVisible
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-stone-800 text-stone-400 border border-white/5'
                              }`}
                              title="Tıklayarak menüde göster / gizle"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isMenuVisible ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'}`} />
                              <span>{isMenuVisible ? 'Menüde Aktif' : 'Gizli'}</span>
                            </button>
                          </td>

                          <td className="py-3 px-4 text-stone-300 font-mono">
                            {count} ürün
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleStartEditCategory(cat)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                                title="Kategoriyi Düzenle"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              {cat.id !== 'all' && (
                                <button
                                  onClick={() => handleDeleteCategory(cat.id)}
                                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                                  title="Kategoriyi Sil"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: SLIDERS                                                 */}
          {/* ============================================================== */}
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: PDF CATALOG MANAGEMENT                                  */}
          {/* ============================================================== */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h1 className="text-xl font-bold text-white">PDF Katalog Yönetimi</h1>
                <p className="text-xs text-stone-400">
                  Sitedeki "PDF Catalog" butonuna tıklandığında açılan 3D interaktif FlipBook ve indirilen PDF dosyasını buradan yönetin.
                </p>
              </div>

              {uploadSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{uploadSuccessMsg}</span>
                  </div>
                </div>
              )}

              <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-6 shadow-xl">
                {/* 1. Active Catalog Header & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">Aktif Yayındaki Katalog</h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>Canlıda Aktif</span>
                        </span>
                        {pdfMeta && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                            Özel Dosya
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 mt-1 font-mono truncate max-w-lg">
                        {pdfMeta?.filename 
                          ? `${pdfMeta.filename} (${pdfMeta.sizeFormatted || (pdfMeta.size ? (pdfMeta.size / (1024 * 1024)).toFixed(2) + ' MB' : '')})`
                          : (catalogPdf.startsWith('blob:') || catalogPdf.startsWith('data:') 
                              ? `Özel Yüklenen Katalog PDF ${uploadedFileName ? `• ${uploadedFileName}` : ''}`
                              : catalogPdf)}
                      </p>
                      {pdfMeta?.updatedAt && (
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          Son Güncelleme: {new Date(pdfMeta.updatedAt).toLocaleString('tr-TR')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setIsPreviewingPdf(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>3D FlipBook Önizle</span>
                    </button>
                    <a
                      href={catalogPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={pdfMeta?.filename || "makemattress-catalog-2026.pdf"}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 text-xs font-semibold transition-colors"
                      title="PDF'i İndir / Aç"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>İndir</span>
                    </a>
                    {(pdfMeta || catalogPdf !== DEFAULT_CATALOG_PATH) && (
                      <button
                        onClick={handleResetPdfToDefault}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-semibold transition-colors cursor-pointer"
                        title="Varsayılan Fabrika Kataloğuna Dön"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Sıfırla</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Direct Computer File Upload (IndexedDB + Disk Persistence) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      1. Bilgisayarınızdan Yeni PDF Dosyası Yükleyin
                    </h4>
                    <span className="text-[11px] text-stone-400 font-medium">
                      50 MB+ Boyut Desteği • Kalıcı Hafıza
                    </span>
                  </div>

                  <div className={`flex items-center justify-center p-8 border-2 border-dashed rounded-2xl bg-black/40 transition-colors ${
                    isUploadingPdf ? 'border-amber-500/60 bg-amber-500/5' : 'border-stone-700 hover:border-amber-500/60'
                  }`}>
                    <label className={`flex flex-col items-center gap-2.5 text-center ${isUploadingPdf ? 'cursor-wait' : 'cursor-pointer'}`}>
                      {isUploadingPdf ? (
                        <>
                          <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
                          <span className="text-sm font-bold text-white">
                            PDF Dosyası İşleniyor ve Kalıcı Olarak Diske Yazılıyor...
                          </span>
                          <span className="text-xs text-stone-400">
                            Lütfen bekleyin, dosya boyutuna göre birkaç saniye sürebilir.
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-inner">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block">
                              Yeni PDF Kataloğu Seçmek İçin Tıklayın
                            </span>
                            <span className="text-xs text-stone-400 mt-1 block">
                              Seçtiğiniz dosya hem proje diskinize hem tarayıcı kalıcı hafızasına kaydedilir.
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 border border-white/10 text-[11px] text-stone-400">
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Maksimum 50+ MB • .pdf formatı</span>
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        disabled={isUploadingPdf}
                        onChange={handlePdfFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* 3. External Custom URL Input (Optional) */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    2. Veya Harici Katalog Linki (CDN / Google Drive / S3)
                  </h4>
                  <form onSubmit={handleSaveCustomUrl} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={customPdfUrl}
                      onChange={(e) => setCustomPdfUrl(e.target.value)}
                      placeholder="https://cdn.domain.com/katalog-2026.pdf veya /catalog/..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
                    >
                      Linki Kaydet & Yayına Al
                    </button>
                  </form>
                </div>

                {/* 4. Permanent Deployment Explanation Guide */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Kalıcı Canlı Yayınlama ve Sıfırlanmama Garantisi:</span>
                  </div>
                  <ul className="text-stone-300 space-y-1.5 pl-6 list-disc text-[11.5px] leading-relaxed">
                    <li>
                      <strong>Fiziksel Dosya Değişimi:</strong> Lokal ortamda yüklediğiniz dosya doğrudan bilgisayarınızdaki <code className="text-amber-300 font-mono">public/catalog/makemattress-catalog-2026.pdf</code> dosyasının üzerine yazılır. Bu sayede sayfa yenilense de, tarayıcı kapansa da asla eski haline geri dönmez.
                    </li>
                    <li>
                      <strong>Canlı Yayına Aktarma:</strong> Lokalden test ettikten sonra bana <strong>"canlıyı güncelle"</strong> demeniz yeterlidir; yeni PDF'iniz Cloudflare CDN üzerinden tüm dünyaya kalıcı olarak yayınlanır.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: SETTINGS                                                */}
          {/* ============================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h1 className="text-xl font-bold text-white">Firma Bilgileri & Sistem Cache</h1>
                <p className="text-xs text-stone-400">Genel sistem durumunu görüntüleyin ve önbelleği sıfırlayın.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white">Sistem Durumu</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <p className="text-stone-400">Toplam Ürün</p>
                    <p className="text-lg font-bold text-white mt-1">{products.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <p className="text-stone-400">Toplam Kategori</p>
                    <p className="text-lg font-bold text-white mt-1">{catList.length}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      if (window.confirm('Tüm özel ürün ve kategori cache verilerini sıfırlayıp fabrika ayarlarına dönmek istiyor musunuz?')) {
                        localStorage.removeItem('makemattress_custom_products');
                        localStorage.removeItem('makemattress_custom_categories');
                        localStorage.removeItem('makemattress_container');
                        window.location.reload();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Önbelleği Sıfırla (Fabrika Ayarlarına Dön)</span>
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem('makemattress_lang_decision');
                      sessionStorage.removeItem('makemattress_lang_dismissed');
                      showToast('Dil önerisi bildirim hafızası sıfırlandı. Anasayfaya geçince 3 sn sonra tekrar görünecektir.');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Globe2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dil Önerisi Hafızasını Sıfırla (Test Et)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* QUICK BULK PASTE MODAL */}
      {showBulkPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-[#141418] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Excel'den Hızlı Toplu Ürün Ekle</h3>
                <p className="text-xs text-stone-400">
                  Her satıra bir ürün gelecek şekilde sekmeli (Tab) veya virgüllü yapıştırın.
                </p>
              </div>
              <button
                onClick={() => setShowBulkPasteModal(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-white/5 text-[11px] text-stone-300 font-mono">
              Format: <code>Ürün Adı [TAB veya VİRGÜL] Kategori_Slug [TAB] Alt Başlık [TAB] Görsel_Yolu</code>
            </div>

            <textarea
              rows={8}
              value={bulkPasteText}
              onChange={(e) => setBulkPasteText(e.target.value)}
              placeholder={"Yatak Fitili 35mm\ttapes\tÖzel Jakarlı Fitil\t/images/mattress-tape-color.jpg\nSertleştirilmiş Keçe 800gr\ttextiles\tTermoform Keçe\t/images/felt-thumb.jpg"}
              className="w-full p-3 rounded-xl bg-black/60 border border-stone-700 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowBulkPasteModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs"
              >
                İptal
              </button>
              <button
                onClick={handleExecuteBulkPaste}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase"
              >
                Ürünleri Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT EDIT MODAL */}
      {isEditingProduct && productForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-xl bg-[#141418] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl my-8">
            <h3 className="text-base font-bold text-white">
              {productForm.id ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Ürün Adı</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Kategori</label>
                <select
                  value={productForm.category}
                  onChange={(e) => {
                    const catObj = catList.find(c => c.id === e.target.value);
                    setProductForm({
                      ...productForm,
                      category: e.target.value,
                      categoryName: catObj ? catObj.name : e.target.value
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                >
                  {catList.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Product Image Upload with Automatic WebP Optimization */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-black/30 border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="block text-stone-200 font-semibold">Ürün Görseli *</label>
                  
                  <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    productOptimizing 
                      ? 'bg-amber-500/20 text-amber-300 cursor-wait' 
                      : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30'
                  }`}>
                    {productOptimizing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>WebP Dönüştürülüyor...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Bilgisayardan Yükle (Otomatik WebP)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={productOptimizing}
                      onChange={handleProductImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* WebP Optimization Result Banner */}
                {productOptStats && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] animate-fade-in">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="flex-1">
                      <span className="font-bold">⚡ Otomatik WebP Optimizasyonu: </span>
                      <span>{productOptStats.original} → {productOptStats.optimized} </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold ml-1">
                        %{productOptStats.savings} Tasarruf
                      </span>
                      <span className="text-emerald-400/70 ml-1">({productOptStats.dims})</span>
                    </div>
                  </div>
                )}

                {/* Image Preview & URL Input */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-stone-900 border border-white/20 shrink-0 relative">
                    <img
                      src={productForm.thumb || '/images/mattress-tape-color.jpg'}
                      alt={productForm.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = '/images/slider-logistics.jpg'; }}
                    />
                    {(productForm.thumb?.startsWith('data:image/webp') || productOptStats) && (
                      <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-emerald-500 text-stone-950 font-black text-[8px] uppercase tracking-wider">
                        WEBP
                      </span>
                    )}
                  </div>

                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={productForm.thumb}
                      onChange={(e) => {
                        setProductForm({ ...productForm, thumb: e.target.value });
                        setProductOptStats(null);
                      }}
                      placeholder="/images/mattress-tape-color.jpg veya https://..."
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <p className="text-[10px] text-stone-400 mt-1">
                      Dosya seçtiğinizde tarayıcınız görseli otomatik olarak sıkıştırıp yüksek verimli <strong>WebP</strong> formatına çevirir.
                    </p>
                  </div>
                </div>

                {/* Quick Presets for Product */}
                <div className="pt-1 border-t border-white/5">
                  <p className="text-[10.5px] text-stone-400 mb-1.5">Hızlı Hazır Görseller:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {presetCategoryImages.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setProductForm({ ...productForm, thumb: preset.url });
                          setProductOptStats(null);
                        }}
                        className={`px-2 py-1 rounded-lg text-[10px] transition-colors border cursor-pointer ${
                          productForm.thumb === preset.url
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                            : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/5'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Alt Başlık</label>
                <input
                  type="text"
                  value={productForm.subtitle}
                  onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Detaylı Açıklama</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
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
                    checked={productForm.inStock !== false}
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

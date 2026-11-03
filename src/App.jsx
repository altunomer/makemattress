import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import ValuePillars from './components/ValuePillars';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import QualityControlSection from './components/QualityControlSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import ContainerDrawer from './components/ContainerDrawer';
import AdminPage from './pages/AdminPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PdfCatalogModal from './components/PdfCatalogModal';
import BackToTopButton from './components/BackToTopButton';

import {
  initialProducts,
  initialCategories,
  initialSliders,
  companyData,
  availableLanguages
} from './data/initialData';

const SUPPORTED_LANG_CODES = ['en', 'tr', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'ka', 'ga', 'ru', 'ar', 'zh'];

export default function App() {
  // Persistent Products State (Loaded from localStorage if edited by admin)
  const [products, setProducts] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('makemattress_custom_products');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialProducts;
  });

  // Persistent Categories State (Loaded from localStorage if edited by admin)
  const [categories, setCategories] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('makemattress_custom_categories');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialCategories;
  });

  const [sliders, setSliders] = useState(initialSliders);
  const [company, setCompany] = useState(companyData);

  // =========================================================================
  // INTERNATIONAL SEO ROUTING & LANGUAGE SLUG EXTRACTION (/en, /tr, /de...)
  // =========================================================================
  const parseCurrentLocation = () => {
    if (typeof window === 'undefined') {
      return { lang: 'en', view: 'home', category: 'all', productId: null };
    }

    const rawPath = window.location.pathname.replace(/\/+$/, '');
    const segments = rawPath.split('/').filter(Boolean);
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search;

    // 1. Check for Admin Route
    if (rawPath.includes('welcome-webmaster') || hash.includes('welcome-webmaster')) {
      return { lang: 'en', view: 'admin', category: 'all', productId: null };
    }

    // 2. Extract Language Slug from first path segment
    let lang = 'en';
    let restSegments = [...segments];

    if (segments.length > 0 && SUPPORTED_LANG_CODES.includes(segments[0].toLowerCase())) {
      lang = segments[0].toLowerCase();
      restSegments = segments.slice(1);
    } else {
      const savedLang = localStorage.getItem('makemattress_lang');
      if (savedLang && SUPPORTED_LANG_CODES.includes(savedLang)) {
        lang = savedLang;
      }
    }

    // 3. Determine View (Hash takes precedence for instant backwards compatibility)
    if (hash.startsWith('#/product/') || hash.startsWith('#product/')) {
      const raw = hash.replace(/^#\/?product\//, '').split('?')[0];
      return { lang, view: 'product', productId: decodeURIComponent(raw), category: 'all' };
    }

    if (hash.startsWith('#/products') || hash.startsWith('#products')) {
      const searchPart = hash.includes('?') ? hash.split('?')[1] : (search ? search.slice(1) : '');
      const params = new URLSearchParams(searchPart);
      return { lang, view: 'products', category: params.get('category') || 'all', productId: null };
    }

    // Check rest path segments (e.g. /en/products, /tr/product/mattress-tape)
    if (restSegments.length > 0) {
      const first = restSegments[0].toLowerCase();
      if (first === 'products') {
        const params = new URLSearchParams(search);
        return { lang, view: 'products', category: params.get('category') || 'all', productId: null };
      }
      if (first === 'product' && restSegments[1]) {
        return { lang, view: 'product', productId: decodeURIComponent(restSegments[1]), category: 'all' };
      }
    }

    return { lang, view: 'home', category: 'all', productId: null };
  };

  const [routeInfo, setRouteInfo] = useState(parseCurrentLocation);
  const [activeLang, setActiveLang] = useState(routeInfo.lang);

  // Synchronize document lang, direction and canonical URL slug on load
  useEffect(() => {
    const langObj = availableLanguages.find(l => l.code === activeLang);
    document.documentElement.lang = activeLang;
    document.documentElement.dir = langObj?.dir || 'ltr';

    // If bare root "/" without lang slug, gently rewrite to "/en" or "/tr"
    if (typeof window !== 'undefined' && window.location.pathname === '/' && !window.location.hash) {
      window.history.replaceState(null, '', `/${activeLang}`);
    }
  }, [activeLang]);

  // Listen to browser popstate and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parseCurrentLocation();
      setRouteInfo(parsed);
      if (parsed.lang && parsed.lang !== activeLang) {
        setActiveLang(parsed.lang);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [activeLang]);

  // Handler for language switching with SEO slug update (/en, /tr...)
  const handleLanguageChange = (newLang) => {
    if (!SUPPORTED_LANG_CODES.includes(newLang)) return;
    setActiveLang(newLang);
    try {
      localStorage.setItem('makemattress_lang', newLang);
    } catch (e) {}

    // Construct new path preserving current view
    let newPath = `/${newLang}`;
    if (routeInfo.view === 'products') {
      const q = routeInfo.category && routeInfo.category !== 'all' ? `?category=${routeInfo.category}` : '';
      newPath = `/${newLang}/products${q}`;
    } else if (routeInfo.view === 'product' && routeInfo.productId) {
      newPath = `/${newLang}/product/${routeInfo.productId}`;
    }

    window.history.pushState(null, '', newPath);
    setRouteInfo(prev => ({ ...prev, lang: newLang }));
  };

  // View Navigation Handlers with Clean SEO URLs
  const navigateToHome = () => {
    const newPath = `/${activeLang}`;
    window.history.pushState(null, '', newPath);
    setRouteInfo({ lang: activeLang, view: 'home', category: 'all', productId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProducts = (catId = 'all') => {
    const q = catId && catId !== 'all' ? `?category=${catId}` : '';
    const newPath = `/${activeLang}/products${q}`;
    window.history.pushState(null, '', newPath);
    setRouteInfo({ lang: activeLang, view: 'products', category: catId, productId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (product) => {
    const id = product.id || product.slug;
    const newPath = `/${activeLang}/product/${id}`;
    window.history.pushState(null, '', newPath);
    setRouteInfo({ lang: activeLang, view: 'product', productId: String(id), product, category: product.category || 'all' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persistent Light / Dark Theme State - DEFAULT TO DARK (BLACK)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('makemattress_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('makemattress_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [containerItems, setContainerItems] = useState([
    initialProducts[0], // Mattress Tape
    initialProducts[1]  // PE Films
  ]);

  const [isContainerDrawerOpen, setIsContainerDrawerOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // PDF Catalog Source State
  const [catalogPdf, setCatalogPdf] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('makemattress_catalog_pdf');
      if (saved) return saved;
    }
    return '/catalog/makemattress-catalog-2026.pdf';
  });

  const handleUpdateCatalogPdf = (newPdf) => {
    setCatalogPdf(newPdf);
    try {
      localStorage.setItem('makemattress_catalog_pdf', newPdf);
    } catch (e) {
      console.warn('Could not persist catalog PDF to localStorage:', e);
    }
  };

  // Hidden admin hotkey: Press Ctrl+Shift+A or Alt+A to route to Admin Page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        window.history.pushState(null, '', '/welcome-webmaster');
        setRouteInfo(prev => ({ ...prev, view: 'admin' }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mixed container item toggler
  const handleToggleContainerItem = (product) => {
    setContainerItems(prev => {
      const exists = prev.some(i => i.id === product.id);
      if (exists) {
        return prev.filter(i => i.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveContainerItem = (id) => {
    setContainerItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearContainer = () => {
    setContainerItems([]);
  };

  // =========================================================================
  // STANDALONE ADMIN ROUTE
  // =========================================================================
  if (routeInfo.view === 'admin') {
    return (
      <AdminPage
        products={products}
        setProducts={setProducts}
        categories={categories}
        setCategories={setCategories}
        sliders={sliders}
        setSliders={setSliders}
        company={company}
        setCompany={setCompany}
        catalogPdf={catalogPdf}
        setCatalogPdf={handleUpdateCatalogPdf}
        onBackToSite={() => {
          navigateToHome();
        }}
      />
    );
  }

  // Active product for single product page
  const singleProductObj = routeInfo.view === 'product'
    ? (products.find(p => String(p.id) === String(routeInfo.productId) || p.slug === routeInfo.productId) || products[0])
    : null;

  // =========================================================================
  // PUBLIC B2B STOREFRONT
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-500 relative overflow-x-hidden bg-[#FAF8F4] dark:bg-[#0C0C0F] text-stone-900 dark:text-stone-100">
      
      {/* Ambient glowing liquid background orbs */}
      <div className="ambient-glow-orbs" aria-hidden="true">
        <div className="ambient-orb-1"></div>
        <div className="ambient-orb-2"></div>
        <div className="ambient-orb-3"></div>
      </div>

      {/* 1. Liquid Glass 3-Capsule Detached Sticky Navbar with Mega Dropdown */}
      <Header
        activeLang={activeLang}
        setActiveLang={handleLanguageChange}
        cartCount={containerItems.length}
        onOpenContainerDrawer={() => setIsContainerDrawerOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenPdfCatalog={() => setIsPdfModalOpen(true)}
        onNavigateHome={navigateToHome}
        onNavigateProducts={navigateToProducts}
        onNavigateQuality={() => {
          if (routeInfo.view !== 'home') {
            navigateToHome();
            setTimeout(() => {
              document.getElementById('quality')?.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          } else {
            document.getElementById('quality')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onNavigateAbout={() => {
          if (routeInfo.view !== 'home') {
            navigateToHome();
            setTimeout(() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          } else {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onNavigateContact={() => {
          if (routeInfo.view !== 'home') {
            navigateToHome();
            setTimeout(() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 2. Main Viewport Router */}
      <main className="flex-1 relative z-10">
        
        {/* VIEW A: PRODUCTS ARCHIVE PAGE */}
        {routeInfo.view === 'products' && (
          <ProductsPage
            products={products}
            categories={categories}
            activeLang={activeLang}
            initialCategory={routeInfo.category || 'all'}
            onSelectProduct={navigateToProduct}
            onToggleContainerItem={handleToggleContainerItem}
            containerItems={containerItems}
            onOpenPdfCatalog={() => setIsPdfModalOpen(true)}
          />
        )}

        {/* VIEW B: SINGLE PRODUCT DETAIL PAGE (WooCommerce / E-Commerce standard) */}
        {routeInfo.view === 'product' && singleProductObj && (
          <ProductDetailPage
            product={singleProductObj}
            allProducts={products}
            activeLang={activeLang}
            onBack={() => navigateToProducts(singleProductObj.category || 'all')}
            onSelectProduct={navigateToProduct}
            onToggleContainerItem={handleToggleContainerItem}
            containerItems={containerItems}
            onOpenPdfCatalog={() => setIsPdfModalOpen(true)}
          />
        )}

        {/* VIEW C: FULL HOME LANDING PAGE */}
        {routeInfo.view === 'home' && (
          <>
            {/* Cinematic Liquid Glass Hero Slider */}
            <HeroSlider
              slides={sliders}
              activeLang={activeLang}
            />

            {/* B2B Sourcing Value Pillars - Overlapping Slider by ~25% */}
            <ValuePillars
              activeLang={activeLang}
            />

            {/* Comprehensive Product Catalog - Click navigates to Single Product Page */}
            <ProductCatalog
              products={products}
              activeLang={activeLang}
              onSelectProduct={navigateToProduct}
              onToggleContainerItem={handleToggleContainerItem}
              containerItems={containerItems}
              onOpenPdfCatalog={() => setIsPdfModalOpen(true)}
            />

            {/* Quality Control & Transparency Story */}
            <QualityControlSection
              activeLang={activeLang}
            />

            {/* About MakeMattress & Kayseri Manufacturing Pedigree */}
            <AboutSection
              activeLang={activeLang}
            />

            {/* Export RFQ & Quotation with Live Container Component Cards */}
            <ContactSection
              containerItems={containerItems}
              onRemoveContainerItem={handleRemoveContainerItem}
              activeLang={activeLang}
            />

            {/* Minimal B2B Industry Newsletter Glass Capsule */}
            <NewsletterSection
              activeLang={activeLang}
            />
          </>
        )}
      </main>

      {/* 3. Obsidian Liquid Glass Footer */}
      <Footer
        onSecretAdminTrigger={() => {
          window.history.pushState(null, '', '/welcome-webmaster');
          setRouteInfo(prev => ({ ...prev, view: 'admin' }));
        }}
        onOpenPdfCatalog={() => setIsPdfModalOpen(true)}
        activeLang={activeLang}
      />

      {/* 4. Modals & Slide-over Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          activeLang={activeLang}
          onClose={() => setSelectedProduct(null)}
          onToggleContainer={handleToggleContainerItem}
          isAdded={containerItems.some(i => i.id === selectedProduct.id)}
        />
      )}

      {/* 3D Interactive FlipBook PDF Catalog Modal */}
      <PdfCatalogModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={catalogPdf}
        theme={theme}
      />

      {/* Mixed Container Drawer */}
      <ContainerDrawer
        isOpen={isContainerDrawerOpen}
        onClose={() => setIsContainerDrawerOpen(false)}
        items={containerItems}
        onRemoveItem={handleRemoveContainerItem}
        onClear={handleClearContainer}
        activeLang={activeLang}
      />

      {/* Polite Round Liquid Glass Back to Top Sticky Button */}
      <BackToTopButton />
    </div>
  );
}

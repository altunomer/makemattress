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
import PdfCatalogModal from './components/PdfCatalogModal';
import BackToTopButton from './components/BackToTopButton';

import {
  initialProducts,
  initialSliders,
  companyData,
  availableLanguages
} from './data/initialData';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [sliders, setSliders] = useState(initialSliders);
  const [company, setCompany] = useState(companyData);

  const [activeLang, setActiveLang] = useState('en');

  // Synchronize document lang and text direction (RTL for Arabic, LTR for others)
  useEffect(() => {
    const langObj = availableLanguages.find(l => l.code === activeLang);
    document.documentElement.lang = activeLang;
    document.documentElement.dir = langObj?.dir || 'ltr';
  }, [activeLang]);

  // Persistent Light / Dark Theme State - DEFAULT TO DARK (BLACK)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('makemattress_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'dark'; // DEFAULT TO DARK per user instruction
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

  // PDF Catalog Source State (persisted in localStorage, managed via Admin Panel)
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

  // Standalone Single-Page Route for Webmaster Admin
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return path.includes('welcome-webmaster') || hash.includes('welcome-webmaster');
    }
    return false;
  });

  useEffect(() => {
    const handleRouteCheck = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdminRoute(path.includes('welcome-webmaster') || hash.includes('welcome-webmaster'));
    };
    window.addEventListener('popstate', handleRouteCheck);
    window.addEventListener('hashchange', handleRouteCheck);
    return () => {
      window.removeEventListener('popstate', handleRouteCheck);
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, []);

  // Hidden admin hotkey: Press Ctrl+Shift+A or Alt+A to route to Admin Page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        window.history.pushState(null, '', '/welcome-webmaster');
        setIsAdminRoute(true);
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
  // STANDALONE ADMIN ROUTE (Completely separate from storefront DOM)
  // =========================================================================
  if (isAdminRoute) {
    return (
      <AdminPage
        products={products}
        setProducts={setProducts}
        sliders={sliders}
        setSliders={setSliders}
        company={company}
        setCompany={setCompany}
        catalogPdf={catalogPdf}
        setCatalogPdf={handleUpdateCatalogPdf}
        onBackToSite={() => {
          window.history.pushState(null, '', '/');
          setIsAdminRoute(false);
        }}
      />
    );
  }

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

      {/* 1. Liquid Glass 3-Capsule Detached Sticky Navbar */}
      <Header
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        cartCount={containerItems.length}
        onOpenContainerDrawer={() => setIsContainerDrawerOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenPdfCatalog={() => setIsPdfModalOpen(true)}
      />

      {/* 2. Main Content Flow with Liquid Glass Depth */}
      <main className="flex-1 relative z-10">
        {/* Cinematic Liquid Glass Hero Slider */}
        <HeroSlider
          slides={sliders}
          activeLang={activeLang}
        />

        {/* B2B Sourcing Value Pillars in Translucent Glass */}
        <ValuePillars
          activeLang={activeLang}
        />

        {/* Comprehensive Product Catalog with Liquid Glass Filter Tabs & Cards */}
        <ProductCatalog
          products={products}
          activeLang={activeLang}
          onSelectProduct={setSelectedProduct}
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
      </main>

      {/* 3. Obsidian Liquid Glass Footer */}
      <Footer
        onSecretAdminTrigger={() => {
          window.history.pushState(null, '', '/welcome-webmaster');
          setIsAdminRoute(true);
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

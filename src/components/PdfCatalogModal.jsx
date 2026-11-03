import React, { useEffect, useRef, useState } from 'react';
import { X, Download, ExternalLink, Sparkles, Maximize2, Minimize2, BookOpen } from 'lucide-react';

const VENDOR_SCRIPTS = [
  "/vendor/flipbook/js/jquery.min.js",
  "/vendor/flipbook/js/three.min.js",
  "/vendor/flipbook/js/pdf.min.js",
  "/vendor/flipbook/js/html2canvas.min.js",
  "/vendor/flipbook/dist/flip-book.min.js"
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)));
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

export default function PdfCatalogModal({
  isOpen,
  onClose,
  pdfUrl = "/catalog/makemattress-catalog-2026.pdf",
  theme = "light"
}) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    let disposed = false;
    let flipBookInstance = null;

    async function init() {
      try {
        setLoading(true);
        setError(null);

        // Load vendor scripts in strict sequential order
        for (const src of VENDOR_SCRIPTS) {
          if (disposed) return;
          await loadScript(src);
        }

        if (disposed || !containerRef.current) return;

        const w = window;
        if (!w.jQuery || !w.jQuery.fn?.FlipBook) {
          throw new Error("FlipBook 3D kütüphanesi yüklenemedi.");
        }

        // Configure PDFJS offline paths
        w.PDFJS_LOCALE = {
          pdfJsWorker: "/vendor/flipbook/js/pdf.worker.js",
          pdfJsCMapUrl: "/vendor/flipbook/cmaps/"
        };
        if (w.PDFJS) {
          w.PDFJS.workerSrc = "/vendor/flipbook/js/pdf.worker.js";
        }

        // Clear any previous dom elements inside container
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }

        const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
        const styleSheet = isDark
          ? "/vendor/flipbook/css/short-black-book-view.css"
          : "/vendor/flipbook/css/short-white-book-view.css";

        // Initialize 3D FlipBook
        const $ = w.jQuery;
        flipBookInstance = $(containerRef.current).FlipBook({
          pdf: pdfUrl,
          template: {
            html: "/vendor/flipbook/templates/default-book-view.html",
            styles: [styleSheet],
            links: [
              { rel: "stylesheet", href: "/vendor/flipbook/css/font-awesome.min.css" }
            ],
            script: "/vendor/flipbook/js/default-book-view.js",
            sounds: {
              startFlip: "/vendor/flipbook/sounds/start-flip.mp3",
              endFlip: "/vendor/flipbook/sounds/end-flip.mp3"
            }
          },
          controlsProps: {
            scale: {
              max: 3.5
            }
          },
          autoResolution: {
            enable: true,
            k: 2.0
          },
          ready: () => {
            if (!disposed) {
              setLoading(false);
            }
          }
        });

        // Safety timeout to hide spinner
        setTimeout(() => {
          if (!disposed) setLoading(false);
        }, 1500);

      } catch (err) {
        console.error("FlipBook başlatma hatası:", err);
        if (!disposed) {
          setError(
            "3D FlipBook başlatılamadı. Tarayıcınız WebGL hızlandırmasını desteklemiyor olabilir. Kataloğu doğrudan PDF olarak indirebilir veya yeni sekmede açabilirsiniz."
          );
          setLoading(false);
        }
      }
    }

    // Small delay to ensure modal DOM is mounted
    const timer = setTimeout(() => {
      init();
    }, 50);

    return () => {
      disposed = true;
      clearTimeout(timer);
      try {
        flipBookInstance?.dispose?.();
      } catch (e) {
        console.warn("FlipBook dispose hatası:", e);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [isOpen, pdfUrl, theme]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          isFullscreen ? 'h-full max-w-full' : 'max-w-6xl h-[92vh]'
        } flex flex-col rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/95 dark:bg-[#121216]/95 border border-stone-300/80 dark:border-white/15 shadow-2xl transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-stone-200/80 dark:border-white/[0.08] bg-[#FAF8F4]/90 dark:bg-[#16161B]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/30 flex items-center justify-center text-[#8C7A58] dark:text-[#D4B37F]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-wider uppercase text-stone-900 dark:text-white">
                  MakeMattress 2026 Export Catalog
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-3 h-3" />
                  3D Interactive
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:block">
                Turn pages with drag or click &bull; Zoom with mouse wheel or pinch
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Download PDF button */}
            <a
              href={pdfUrl}
              download="makemattress-catalog-2026.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/15 dark:bg-amber-400/20 hover:bg-amber-500/25 text-[#8C7A58] dark:text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
              title="Download PDF to your device"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download PDF</span>
            </a>

            {/* Open in new tab button */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-white/10 transition-colors"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Toggle Fullscreen button */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer hidden sm:inline-flex"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer ml-1"
              title="Close (Esc)"
              aria-label="Close catalog modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FlipBook Viewer Container */}
        <div className="relative flex-1 w-full h-full min-h-[500px] overflow-hidden bg-stone-100 dark:bg-[#0A0A0D]">
          {/* Loading Indicator */}
          {loading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-[#0E0E12]/80 backdrop-blur-xs animate-fade-in">
              <div className="w-10 h-10 border-3 border-amber-500/20 border-t-[#8C7A58] dark:border-t-amber-400 rounded-full animate-spin"></div>
              <p className="text-xs font-medium text-stone-700 dark:text-stone-300 tracking-wide">
                Loading 3D FlipBook Catalog…
              </p>
            </div>
          )}

          {/* WebGL Fallback / Error State */}
          {error && (
            <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-white/95 dark:bg-[#0E0E12]/95">
              <div className="max-w-md text-center space-y-4 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-lg">
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {error}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#8C7A58] dark:bg-[#D4B37F] text-white dark:text-stone-900 text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open PDF in New Tab
                  </a>
                  <a
                    href={pdfUrl}
                    download="makemattress-catalog-2026.pdf"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 3D FlipBook DOM Mount Target */}
          <div
            ref={containerRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%", position: "relative" }}
          />
        </div>
      </div>
    </div>
  );
}

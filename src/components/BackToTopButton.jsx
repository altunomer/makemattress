import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl bg-white/80 dark:bg-[#121217]/85 border border-white/60 dark:border-white/15 text-stone-800 dark:text-stone-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 group cursor-pointer ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
      title="Yukarı Çık"
    >
      <ChevronUp className="w-5 h-5 text-stone-700 dark:text-stone-200 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = (event: Event) => {
      const scrollY = window.scrollY;

      const target = event.target as HTMLElement;
      const elementScrollTop = target && target !== (document as any) ? target.scrollTop : 0;

      setVisible(scrollY > 500 || elementScrollTop > 500);
    };
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const scrollableElement = document.querySelector('main.overflow-y-auto');
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Yukarı çık"
      className="fixed bottom-6 right-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 animate-in fade-in zoom-in"
    >
      ↑
    </button>
  );
}

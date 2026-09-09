"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has scrolled into view (one-shot). Used for
 * below-the-fold content that should reveal on arrival rather than
 * play its entrance animation before the user can see it. Reduced
 * motion still needs this (it gates opacity, not just an animation),
 * so it stays on unconditionally — CSS handles skipping the motion.
 */
export function useRevealOnView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

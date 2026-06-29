import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions | number = {}
) {
  // Soporte para legado: si pasan un número directamente como threshold
  const normalizedOptions: UseRevealOptions =
    typeof options === "number" ? { threshold: options } : options;

  const { threshold = 0.12, rootMargin = "0px" } = normalizedOptions;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible] as const;
}

export function revealStyle(visible: boolean): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition:
      "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  };
}

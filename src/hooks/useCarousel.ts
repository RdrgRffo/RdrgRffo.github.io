import { useState, useCallback, useEffect } from "react";

export function useCarousel(totalSlides: number) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0) setCurrent(totalSlides - 1);
      else if (index >= totalSlides) setCurrent(0);
      else setCurrent(index);
    },
    [totalSlides]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  return { current, total: totalSlides, goTo, next, prev };
}

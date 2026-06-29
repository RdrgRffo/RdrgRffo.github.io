import { useRef, useEffect, useState } from "react";
import { T } from "../tokens";
import { ProjectImage } from "../types";
import { useCarousel } from "../hooks/useCarousel";
import { imagePath } from "../utils/imagePath";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    position: "relative" as const,
  },
  viewport: (needsScroll: boolean): React.CSSProperties => ({
    flex: 1,
    overflow: needsScroll ? "auto" : "hidden",
    position: "relative" as const,
    background: T.surface,
  }),
  track: (offset: number): React.CSSProperties => ({
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
    transform: `translateX(-${offset}%)`,
    transition: "transform 0.42s cubic-bezier(0.16,1,0.3,1)",
  }),
  slide: {
    minWidth: "100%",
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: T.surface,
    cursor: "zoom-in",
  } as React.CSSProperties,
  image: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  placeholder: {
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "clamp(48px, 8vw, 96px)",
    fontWeight: 700,
    color: T.border,
  } as React.CSSProperties,
  placeholderText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: T.gray,
    marginTop: "8px",
  } as React.CSSProperties,
  placeholderContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  } as React.CSSProperties,
  footer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: T.white,
    borderTop: `1px solid ${T.border}`,
  } as React.CSSProperties,
  caption: {
    flex: 1,
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: T.gray,
    margin: 0,
  } as React.CSSProperties,
  counter: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: T.gray,
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  navBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: `1.5px solid ${T.border}`,
    background: T.white,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: T.black,
    padding: 0,
    lineHeight: 1,
  } as React.CSSProperties,
  // Expanded overlay
  expandedOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 400,
    display: "flex",
    flexDirection: "column" as const,
    background: "rgba(0,0,0,0.92)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    cursor: "zoom-out",
  } as React.CSSProperties,
  expandedImgWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    padding: "20px",
    cursor: "default",
  } as React.CSSProperties,
  expandedImg: (scale: number): React.CSSProperties => ({
    display: "block",
    maxWidth: scale === 1 ? "95vw" : "none",
    maxHeight: scale === 1 ? "80vh" : "none",
    width: scale === 1 ? "auto" : "auto",
    height: scale === 1 ? "auto" : "auto",
    transform: scale === 1 ? "none" : `scale(${scale})`,
    transformOrigin: "top left",
    objectFit: "contain" as const,
    borderRadius: "4px",
    cursor: "zoom-out",
  }),
  expandedFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: "12px 24px",
    flexShrink: 0,
  } as React.CSSProperties,
  expandedCaption: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.7)",
    textAlign: "center" as const,
    maxWidth: "500px",
  } as React.CSSProperties,
  zoomBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1.5px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.1)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    color: "#fff",
    padding: 0,
    lineHeight: 1,
    backdropFilter: "blur(4px)",
  } as React.CSSProperties,
  zoomLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: "rgba(255,255,255,0.5)",
    minWidth: "36px",
    textAlign: "center" as const,
  } as React.CSSProperties,
};

interface CarouselProps {
  images: ProjectImage[];
}

export default function Carousel({ images }: CarouselProps) {
  const total = images.length > 0 ? images.length : 1;
  const { current, next, prev } = useCarousel(total);
  const hasImages = images.length > 0;
  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);
  const [expandedSrc, setExpandedSrc] = useState<string | null>(null);
  const [expandedCaption, setExpandedCaption] = useState("");
  const [zoom, setZoom] = useState(1);

  // Check if image needs scroll (taller than viewport)
  useEffect(() => {
    const check = () => {
      if (viewportRef.current && imgRef.current) {
        const vh = viewportRef.current.clientHeight;
        const ih = imgRef.current.clientHeight;
        setNeedsScroll(ih > vh);
      }
    };
    check();
    const img = imgRef.current;
    if (img) {
      img.addEventListener("load", check);
      return () => img.removeEventListener("load", check);
    }
  }, [current]);

  // Scroll to top when image changes
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo(0, 0);
    }
  }, [current]);

  // Reset zoom when opening expanded view
  useEffect(() => {
    if (expandedSrc) setZoom(1);
  }, [expandedSrc]);

  const handleImageClick = (src: string, caption: string) => {
    setExpandedSrc(src);
    setExpandedCaption(caption);
  };

  return (
    <>
      <div style={styles.container}>
        <div ref={viewportRef} style={styles.viewport(needsScroll)}>
          <div style={styles.track(current * 100)}>
            {hasImages
              ? images.map((img, i) => (
                  <div
                    key={i}
                    style={styles.slide}
                    onClick={() => handleImageClick(imagePath(img.src), img.caption)}
                  >
                    <img
                      ref={i === current ? imgRef : undefined}
                      src={imagePath(img.src)}
                      alt={img.caption}
                      style={styles.image}
                    />
                  </div>
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} style={styles.slide}>
                    <div style={styles.placeholderContent}>
                      <span style={styles.placeholder}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={styles.placeholderText}>
                        Placeholder — Añade una imagen aquí
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div style={styles.footer}>
          <button
            style={styles.navBtn}
            onClick={prev}
            aria-label="Imagen anterior"
          >
            ←
          </button>
          <span style={styles.counter}>
            {current + 1} / {total}
          </span>
          <button
            style={styles.navBtn}
            onClick={next}
            aria-label="Imagen siguiente"
          >
            →
          </button>
          <p style={styles.caption}>
            {hasImages
              ? images[current]?.caption ?? ""
              : "Sin imágenes aún"}
          </p>
        </div>
      </div>

      {/* Expanded image overlay */}
      {expandedSrc && (
        <div
          style={styles.expandedOverlay}
          onClick={() => setExpandedSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Imagen expandida"
        >
          <div style={styles.expandedImgWrapper}>
            <img
              src={expandedSrc}
              alt={expandedCaption}
              style={styles.expandedImg(zoom)}
              onClick={() => setExpandedSrc(null)}
            />
          </div>

          <div style={styles.expandedFooter}>
            <button
              style={styles.zoomBtn}
              onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(5, +(z + 0.25).toFixed(2))); }}
              aria-label="Acercar"
            >
              +
            </button>
            <span style={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
            <button
              style={styles.zoomBtn}
              onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2))); }}
              aria-label="Alejar"
            >
              −
            </button>
            <p style={styles.expandedCaption}>{expandedCaption}</p>
          </div>
        </div>
      )}
    </>
  );
}

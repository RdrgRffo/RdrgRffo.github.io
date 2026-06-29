import { useRef, useEffect, useState, useCallback } from "react";
import { T } from "../tokens";
import { Project } from "../types";
import { useScrollLock } from "../hooks/useScrollLock";
import { imagePath } from "../utils/imagePath";
import Carousel from "./Carousel";
import mermaid from "mermaid";

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(13,13,13,0.65)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    padding: "20px",
  } as React.CSSProperties,
  modal: {
    maxWidth: "1080px",
    maxHeight: "90vh",
    width: "100%",
    height: "90vh",
    background: T.white,
    borderRadius: "8px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    position: "relative",
    overflow: "hidden",
    animation: "modalEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  } as React.CSSProperties,
  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    zIndex: 10,
    width: "34px",
    height: "34px",
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
  leftCol: {
    overflowY: "auto",
    height: "100%",
    padding: "32px",
    borderRight: `1px solid ${T.border}`,
  } as React.CSSProperties,
  rightCol: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  } as React.CSSProperties,
  sectionHeading: {
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "18px",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: T.black,
    margin: "28px 0 12px 0",
  } as React.CSSProperties,
  paragraph: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.75,
    color: T.gray,
    margin: "0 0 16px 0",
  } as React.CSSProperties,
  bullet: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.75,
    color: T.gray,
    margin: "0 0 4px 0",
    paddingLeft: "16px",
  } as React.CSSProperties,
  code: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderLeft: `3px solid ${T.accentDk}`,
    borderRadius: "0 4px 4px 0",
    padding: "16px 16px 16px 20px",
    whiteSpace: "pre-wrap" as const,
    overflowX: "auto" as const,
    margin: "0 0 16px 0",
    lineHeight: 1.6,
    color: T.black,
  } as React.CSSProperties,
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "24px",
    paddingBottom: "24px",
    borderBottom: `1px solid ${T.border}`,
  } as React.CSSProperties,
  metaLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.gray,
    margin: "0 0 4px 0",
  } as React.CSSProperties,
  metaValue: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: T.black,
    margin: 0,
  } as React.CSSProperties,
  links: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: `1px solid ${T.border}`,
  } as React.CSSProperties,
  linkBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 20px",
    border: `1.5px solid ${T.black}`,
    borderRadius: "100px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: T.black,
    background: "transparent",
    cursor: "pointer",
    textDecoration: "none",
  } as React.CSSProperties,
  title: {
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "clamp(18px, 2.2vw, 26px)",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: T.black,
    margin: "0 0 4px 0",
  } as React.CSSProperties,
  subtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: T.gray,
    margin: "0 0 24px 0",
  } as React.CSSProperties,
  stackFooter: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap" as const,
    paddingTop: "16px",
    marginTop: "12px",
    borderTop: `1px solid ${T.border}`,
  } as React.CSSProperties,
  stackTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: T.accentDk,
    letterSpacing: "0.08em",
  } as React.CSSProperties,
  sectionImage: {
    width: "100%",
    borderRadius: "6px",
    border: `1px solid ${T.border}`,
    margin: "0 0 16px 0",
  } as React.CSSProperties,
  expandedOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    cursor: "zoom-out",
    padding: "40px",
  } as React.CSSProperties,
  expandedImage: {
    maxWidth: "95vw",
    maxHeight: "90vh",
    width: "auto",
    height: "auto",
    objectFit: "contain" as const,
    borderRadius: "8px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
  } as React.CSSProperties,
  expandHint: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    fontSize: "10px",
    padding: "3px 8px",
    borderRadius: "4px",
    fontFamily: "'Inter', sans-serif",
    pointerEvents: "none" as const,
    opacity: 0.7,
  } as React.CSSProperties,
  imageWrapper: {
    position: "relative" as const,
    display: "inline-block" as const,
    width: "100%",
    cursor: "zoom-in",
  } as React.CSSProperties,
  diagramBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 24px",
    border: `1.5px solid ${T.accentDk}`,
    borderRadius: "100px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: T.accentDk,
    background: "transparent",
    cursor: "pointer",
    margin: "0 0 16px 0",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
  expandedCodeOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    cursor: "zoom-out",
    padding: "40px",
  } as React.CSSProperties,
  expandedCodeBox: {
    maxWidth: "90vw",
    maxHeight: "85vh",
    width: "100%",
    height: "85vh",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    cursor: "default",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
  } as React.CSSProperties,

  expandedCodeHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    borderBottom: `1px solid ${T.border}`,
    background: T.white,
    flexShrink: 0,
  } as React.CSSProperties,
  expandedCodeTitle: {
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    color: T.black,
    margin: 0,
  } as React.CSSProperties,
  expandedCodeClose: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: `1px solid ${T.border}`,
    background: T.white,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: T.black,
    padding: 0,
    lineHeight: 1,
  } as React.CSSProperties,
};



interface ModalProps {
  project: Project;
  onClose: () => void;
}

/** Renderiza un diagrama Mermaid como SVG con zoom y pan */
function MermaidDisplay({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOrigin = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;

          // Hacer que el SVG tenga el tamaño exacto del contenedor
          // Así el navegador escala el contenido del viewBox para llenar ese espacio
          const svgEl = containerRef.current.querySelector("svg");
          const wrapper = wrapperRef.current;
          if (svgEl && wrapper) {
            const rect = wrapper.getBoundingClientRect();
            const w = Math.floor(rect.width - 64);
            const h = Math.floor(rect.height - 64);

            // Establecer width y height fijos para que el SVG ocupe todo el contenedor
            svgEl.setAttribute("width", String(w));
            svgEl.setAttribute("height", String(h));
            // El viewBox ya está en el SVG, el navegador escala automáticamente
          }

          // Reset zoom/pan — el SVG ya está a tamaño completo
          setScale(1);
          setPan({ x: 0, y: 0 });
        }
      })
      .catch(() => setError(true));
  }, [code]);






  // ── Zoom con rueda ──
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((s) => Math.max(0.25, Math.min(5, s + delta)));
  }, []);

  // ── Pan con mouse ──
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Solo con click izquierdo
    if (e.button !== 0) return;
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY };
    panOrigin.current = { x: pan.x, y: pan.y };
    if (wrapperRef.current) wrapperRef.current.style.cursor = "grabbing";
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setPan({ x: panOrigin.current.x + dx, y: panOrigin.current.y + dy });
  }, []);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
    if (wrapperRef.current) wrapperRef.current.style.cursor = "grab";
  }, []);

  // ── Reset zoom ──
  const handleDoubleClick = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  if (error) {
    return (
      <pre style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "13px",
        lineHeight: 1.7,
        color: "#1e293b",
        padding: "28px",
        margin: 0,
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        flex: 1,
      }}>
        {code}
      </pre>
    );
  }

  return (
    <div
      ref={wrapperRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      style={{
        flex: 1,
        overflow: "hidden",
        background: "#fff",
        cursor: "grab",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Barra de zoom */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid #e2e4e8",
          borderRadius: "8px",
          padding: "6px 10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          pointerEvents: "auto",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setScale((s) => Math.max(0.25, s - 0.25)); }}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            color: "#64748b",
            padding: "2px 6px",
            lineHeight: 1,
          }}
          aria-label="Alejar"
        >
          −
        </button>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: "#1e293b",
            minWidth: "36px",
            textAlign: "center",
          }}
        >
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); setScale((s) => Math.min(5, s + 0.25)); }}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            color: "#64748b",
            padding: "2px 6px",
            lineHeight: 1,
          }}
          aria-label="Acercar"
        >
          +
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setScale(1); setPan({ x: 0, y: 0 }); }}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: "#2563EB",
            padding: "2px 6px",
            lineHeight: 1,
            fontWeight: 500,
          }}
          aria-label="Reset zoom"
        >
          ↺
        </button>
      </div>

      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: "0 0",
          transition: "none",
          display: "inline-block",
          padding: "32px",
        }}
      >
        <div ref={containerRef} />
      </div>
    </div>
  );
}

export default function Modal({ project, onClose }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedCode, setExpandedCode] = useState<{ heading: string; code: string } | null>(null);

  useScrollLock(true);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (expandedCode) {
          setExpandedCode(null);
        } else if (expandedImage) {
          setExpandedImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, expandedImage, expandedCode]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  // ── Inicializar Mermaid una sola vez ──
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      themeVariables: {
        fontFamily: "'Inter', sans-serif",
        primaryColor: "#2563EB",
        primaryTextColor: "#1e293b",
        primaryBorderColor: "#94a3b8",
        lineColor: "#64748b",
        secondaryColor: "#f1f5f9",
        tertiaryColor: "#f8fafc",
      },
    });
  }, []);

  return (
    <>
      <div
        ref={backdropRef}
        style={styles.backdrop}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <div style={styles.modal}>
          <button
            style={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>

          {/* Left column — README */}
          <div style={styles.leftCol}>
            <h2 style={styles.title}>{project.title}</h2>
            <p style={styles.subtitle}>{project.subtitle}</p>

            <div style={styles.metaGrid}>
              <div>
                <p style={styles.metaLabel}>Periodo</p>
                <p style={styles.metaValue}>{project.meta.period}</p>
              </div>
              <div>
                <p style={styles.metaLabel}>Duración</p>
                <p style={styles.metaValue}>{project.meta.duration}</p>
              </div>
              <div>
                <p style={styles.metaLabel}>Rol</p>
                <p style={styles.metaValue}>{project.meta.role}</p>
              </div>
              <div>
                <p style={styles.metaLabel}>Herramientas</p>
                <p style={styles.metaValue}>{project.meta.tools}</p>
              </div>
            </div>

            {project.readme.sections.map((section, i) => {
              const isDiagram = section.code && /diagrama|arquitectura/i.test(section.heading);
              return (
                <div key={i}>
                  <p style={styles.sectionHeading}>{section.heading}</p>
                  {section.image && (
                    <div
                      style={styles.imageWrapper}
                      onClick={() => setExpandedImage(section.image!)}
                    >
                      <img
                        src={imagePath(section.image!)}
                        alt={`Diagrama de arquitectura — ${project.title}`}
                        style={styles.sectionImage}
                        onError={(e) => console.error("Error loading architecture image:", imagePath(section.image!), e)}
                      />
                      <span style={styles.expandHint}>↗ expandir</span>
                    </div>
                  )}
                  {section.content && (
                    <p style={styles.paragraph}>{section.content}</p>
                  )}
                  {section.bullets?.map((bullet, j) => (
                    <p key={j} style={styles.bullet}>
                      <span style={{ color: T.accentDk, marginRight: "8px" }}>◆</span>
                      {bullet}
                    </p>
                  ))}
                  {isDiagram ? (
                    <button
                      style={styles.diagramBtn}
                      className="diagram-btn"
                      onClick={() => setExpandedCode({ heading: section.heading, code: section.code! })}
                    >
                      ⊞ Ver diagrama de arquitectura
                    </button>
                  ) : section.code && (
                    <pre style={styles.code}>{section.code}</pre>
                  )}
                </div>
              );
            })}


            <div style={styles.links}>
              <a
                href={project.links[0]?.url || "#"}
                style={styles.linkBtn}
                className="pill-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.links[0]?.label || "Repositorio"} ↗
              </a>
            </div>

            {/* Stack tags footer */}
            <div style={styles.stackFooter}>
              {project.stack.map((s) => (
                <span key={s} style={styles.stackTag}>+{s}</span>
              ))}
            </div>
          </div>

          {/* Right column — Carousel */}
          <div style={styles.rightCol}>
            <Carousel images={project.images} />
          </div>
        </div>
      </div>

      {/* Expanded image overlay */}
      {expandedImage && (
        <div
          style={styles.expandedOverlay}
          onClick={() => setExpandedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Diagrama expandido"
        >
          <img
            src={imagePath(expandedImage)}
            alt="Diagrama de arquitectura expandido"
            style={styles.expandedImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Expanded code overlay — Mermaid renderizado visualmente */}
      {expandedCode && (
        <div
          style={styles.expandedCodeOverlay}
          onClick={() => setExpandedCode(null)}
          role="dialog"
          aria-modal="true"
          aria-label={expandedCode.heading}
        >
          <div
            style={styles.expandedCodeBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.expandedCodeHeader}>
              <p style={styles.expandedCodeTitle}>{expandedCode.heading}</p>
              <button
                style={styles.expandedCodeClose}
                onClick={() => setExpandedCode(null)}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
            <MermaidDisplay code={expandedCode.code} />
          </div>
        </div>
      )}
    </>

  );
}

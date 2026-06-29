
import { useState, useEffect } from "react";
import { T } from "../tokens";
import { imagePath } from "../utils/imagePath";

const nameStyle = (revealed: boolean): React.CSSProperties => ({
  fontFamily: "'Cabinet Grotesk', sans-serif",
  fontSize: "clamp(48px, 8vw, 96px)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  color: T.black,
  lineHeight: 1,
  margin: "0 0 24px 0",
  clipPath: revealed ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
  transition: "clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1), letter-spacing 0.3s ease",
  display: "inline-block",
});

const nameHoverStyle: React.CSSProperties = {
  letterSpacing: "0.01em",
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    padding: "80px 40px 64px",
    maxWidth: "1200px",
    margin: "0 auto",
    overflow: "hidden",
  },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.accentDk,
    marginBottom: "24px",
  },
  tagline: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.75,
    color: T.gray,
    maxWidth: "560px",
    margin: 0,
  },
  availability: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: T.gray,
    marginBottom: "12px",
  },
  stackLine: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
    fontWeight: 400,
    color: T.gray,
    margin: "12px 0 0 0",
  } as React.CSSProperties,
  photoWrapper: {
    position: "absolute",
    top: "50%",
    right: "40px",
    transform: "translateY(-50%)",
    width: "360px",
    height: "360px",
    borderRadius: "8px",
    overflow: "hidden",
    background: T.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  } as React.CSSProperties,
};

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={styles.section} id="hero" className="hero-section">
      <p style={styles.eyebrow} className="section-eyebrow">{"<Presentacion />"}</p>
      <h1
        style={{
          ...nameStyle(revealed),
          ...(nameHovered ? nameHoverStyle : {}),
        }}
        onMouseEnter={() => setNameHovered(true)}
        onMouseLeave={() => setNameHovered(false)}
      >
        Rodrigo
        <br />
        Riffo
      </h1>
      <div style={styles.availability}>
        <span className="status-dot" />
        <span>Disponible para proyectos  —  Canarias, España</span>
      </div>
      <p style={styles.tagline}>
        Fullstack Developer con enfoque principal en backend. Construyo
        sistemas robustos y escalables que resuelven problemas reales.
      </p>
      <p style={styles.stackLine}>
        Java · Spring Boot · React · Node.js · Docker
      </p>
      <div style={styles.photoWrapper}>
        <img src={imagePath("/working_portrait.png")} alt="Rodrigo Riffo" style={styles.photo} />
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { T } from "../tokens";
import { Project } from "../types";

const styles = {
  card: (color: string, isWide: boolean, cursorVisible: boolean): React.CSSProperties => ({
    position: "relative",
    gridColumn: isWide ? "span 2" : undefined,
    aspectRatio: isWide ? "16 / 7" : "4 / 3",
    background: color,
    borderRadius: "4px",
    overflow: "hidden",
    cursor: cursorVisible ? "none" : "pointer",
    border: "none",
    padding: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    textAlign: "left",
    color: T.white,
  }),
  overlayBase: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.5) 40%, rgba(13,13,13,0.1) 70%, transparent 100%)",
    pointerEvents: "none",
  } as React.CSSProperties,
  overlayHover: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.35) 50%, rgba(13,13,13,0.1) 100%)",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.35s ease",
  } as React.CSSProperties,
  content: {
    position: "relative",
    zIndex: 2,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  } as React.CSSProperties,
  number: {
    position: "absolute",
    top: "16px",
    right: "20px",
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "clamp(18px, 2.2vw, 26px)",
    fontWeight: 700,
    color: "rgba(248,248,246,0.35)",
    zIndex: 2,
  } as React.CSSProperties,
  title: {
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "clamp(18px, 2.2vw, 26px)",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: T.white,
    margin: 0,
  } as React.CSSProperties,
  subtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: "rgba(248,248,246,0.7)",
    margin: 0,
  } as React.CSSProperties,
  stackTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: T.accent,
    letterSpacing: "0.08em",
    margin: 0,
  } as React.CSSProperties,
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
  isWide?: boolean;
  onCursorMove?: (cursor: { visible: boolean; x: number; y: number }) => void;
}

export default function ProjectCard({ project, onOpen, isWide, onCursorMove }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleClick = () => onOpen(project);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(project);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hasHover && onCursorMove) {
      onCursorMove({ visible: true, x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hasHover && onCursorMove) {
      onCursorMove({ visible: false, x: 0, y: 0 });
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Abrir proyecto: ${project.title}`}
      style={styles.card(project.coverColor, isWide ?? false, isHovered && hasHover)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div style={styles.overlayBase} />
      <div
        style={{
          ...styles.overlayHover,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <span style={styles.number}>
        {String(project.id).padStart(2, "0")}
      </span>
      <div style={styles.content}>
        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.subtitle}>{project.subtitle}</p>
        <p style={styles.stackTag}>
          {project.stack.map((s) => `+${s}`).join(" ")}
        </p>
      </div>
    </div>
  );
}

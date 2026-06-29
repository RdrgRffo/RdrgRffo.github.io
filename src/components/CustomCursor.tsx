import { T } from "../tokens";

interface CustomCursorProps {
  visible: boolean;
  x: number;
  y: number;
}

export default function CustomCursor({ visible, x, y }: CustomCursorProps) {
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: T.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.6})`,
        transition: "opacity 0.2s, transform 0.2s",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.08em",
          color: T.black,
          textTransform: "uppercase",
          userSelect: "none",
        }}
      >
        VER →
      </span>
    </div>
  );
}

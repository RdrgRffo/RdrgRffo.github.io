import { T } from "../tokens";
import { useReveal } from "../hooks/useReveal";

export default function SectionDivider() {
  const [ref, visible] = useReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      style={{
        height: "1px",
        background: T.border,
        transformOrigin: "left",
        transform: visible ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        marginBottom: "24px",
      }}
    />
  );
}

import { T } from "../tokens";
import SectionDivider from "./SectionDivider";
import { useReveal, revealStyle } from "../hooks/useReveal";

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "64px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.accentDk,
    marginBottom: "32px",
  },
  content: {
    maxWidth: "720px",
  },
  heading: {
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "clamp(18px, 2.2vw, 26px)",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: T.black,
    margin: "0 0 16px 0",
  },
  text: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.75,
    color: T.gray,
    margin: "0 0 16px 0",
  },
  statsContainer: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap" as const,
    marginTop: "48px",
    paddingTop: "40px",
    borderTop: `1px solid ${T.border}`,
  },
  statCard: {
    padding: "20px 24px",
    border: `1px solid ${T.border}`,
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    flex: "1 1 140px",
  } as React.CSSProperties,
  statLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: T.gray,
    margin: 0,
  } as React.CSSProperties,
  statValue: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "16px",
    fontWeight: 600,
    color: T.black,
    margin: 0,
  } as React.CSSProperties,
};

const stats = [
  { label: "Especialización", value: "Backend Development" },
  { label: "Ubicación", value: "Canarias, España" },
  { label: "Rol", value: "Fullstack Developer" },
  { label: "Idiomas", value: "ES · EN" },
];

export default function About() {
  const [contentRef, contentVisible] = useReveal<HTMLDivElement>();
  const [statsRef, statsVisible] = useReveal<HTMLDivElement>(0.1);

  return (
    <section style={styles.section} id="about">
      <SectionDivider />
      <p style={styles.eyebrow} className="section-eyebrow">{"<Sobre Mi />"}</p>
      <div ref={contentRef} style={{ ...styles.content, ...revealStyle(contentVisible) }}>
        <h2 style={styles.heading}>
          Construyendo sistemas backend con propósito
        </h2>
        <p style={styles.text}>
          Desarrollador fullstack con enfoque principal en backend.
          Me especializo en diseñar arquitecturas escalables, APIs
          robustas y bases de datos eficientes que soportan productos
          digitales de alto rendimiento.
        </p>
        <p style={styles.text}>
          Trabajo con tecnologías como Node.js, PostgreSQL y
          Docker, combinándolas con React en el frontend cuando el
          proyecto lo requiere. Creo en el código limpio, las pruebas
          automatizadas y la documentación como parte fundamental del
          desarrollo.
        </p>
      </div>
      <div ref={statsRef} style={{ ...styles.statsContainer, ...revealStyle(statsVisible) }}>
        {stats.map((stat) => (
          <div key={stat.label} style={styles.statCard}>
            <p style={styles.statLabel}>{stat.label}</p>
            <p style={styles.statValue}>{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

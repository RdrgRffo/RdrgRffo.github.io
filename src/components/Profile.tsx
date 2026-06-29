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
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "clamp(60px, 10vw, 120px)",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    paddingLeft: "40px",
    borderLeft: "2px solid rgba(226, 228, 232, 0.5)",
  } as React.CSSProperties,
  heading: {
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "clamp(18px, 2.2vw, 26px)",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: T.black,
    margin: 0,
  },
  text: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.75,
    color: T.gray,
    margin: 0,
  },
  skillsGroup: {
    marginBottom: "12px",
    paddingTop: "14px",
    borderTop: "1px solid rgba(226, 228, 232, 0.5)",
  } as React.CSSProperties,

  firstSkillsGroup: {
    paddingTop: "0",
    borderTop: "none",
  } as React.CSSProperties,
  skillsLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.accentDk,
    margin: "0 0 12px 0",
  } as React.CSSProperties,
  skillsList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  } as React.CSSProperties,
  skillItem: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: T.black,
    margin: 0,
    paddingLeft: "12px",
    borderLeft: `2px solid ${T.accent}`,
  } as React.CSSProperties,
  formationItem: {
    marginBottom: "16px",
  } as React.CSSProperties,
  formationTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: T.black,
    margin: "0 0 2px 0",
  } as React.CSSProperties,
  formationMeta: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: T.gray,
    margin: 0,
  } as React.CSSProperties,
};

export default function Profile() {
  const [contentRef, contentVisible] = useReveal<HTMLDivElement>();

  return (
    <section style={styles.section} id="profile">
      <SectionDivider />
      <p style={styles.eyebrow} className="section-eyebrow">{"<Perfil Profesional />"}</p>
      <div ref={contentRef} style={{ ...styles.grid, ...revealStyle(contentVisible) }} className="grid-2col">
        {/* Left column: Profile text */}
        <div style={styles.column}>
          <h2 style={styles.heading}>
            Full-Stack Developer
            <br />
            base backend y visión frontend
          </h2>
          <p style={styles.text}>
            Desarrollador Full-Stack Junior con sólida base backend y visión
            frontend, con un trasfondo en diseño gráfico y fotografía.
            Especializado en Java con Spring Boot — mi stack principal —,
            Node.js con TypeScript, persistencia relacional, Docker y creación
            de interfaces interactivas con React, Next.js y Tailwind CSS.
          </p>
          <p style={styles.text}>
            Enfocado en construir aplicaciones web funcionales integrando
            herramientas de IA (Agent Engineering) de forma analítica para
            optimizar código, agilizar tareas y acelerar suites de pruebas
            bajo buenas prácticas (SOLID).
          </p>

          {/* Formación */}
          <div style={{ marginTop: "16px" }}>
            <p style={styles.skillsLabel}>Formación</p>
            <div style={styles.formationItem}>
              <p style={styles.formationTitle}>
                Técnico Superior en Desarrollo de Aplicaciones Web (DAW)
              </p>
              <p style={styles.formationMeta}>
                CIFP César Manrique · S.C. de Tenerife · 2024 – 2026
              </p>
            </div>
            <div style={styles.formationItem}>
              <p style={styles.formationTitle}>
                Técnico Superior en Diseño y Gestión de la Producción Gráfica
              </p>
              <p style={styles.formationMeta}>
                CIFP Virgen de Candelaria · S.C. de Tenerife · 2022 – 2024
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Skills — alineada con el segundo párrafo */}
        <div style={styles.rightColumn} className="right-column-skills">
          {/* Spacer para alinear visualmente con el segundo párrafo */}
          <div style={{ height: "clamp(72px, 6.5vw, 96px)" }} className="right-column-spacer" />

          <div style={{ ...styles.skillsGroup, ...styles.firstSkillsGroup }}>
            <p style={styles.skillsLabel}>Lenguajes y Frameworks</p>
            <div style={styles.skillsList}>
              <p style={styles.skillItem}>Java (Spring Boot), React, Node.js (TypeScript, Express), Tailwind CSS</p>
            </div>
          </div>

          <div style={styles.skillsGroup}>
            <p style={styles.skillsLabel}>Diseño y Prototipado</p>
            <div style={styles.skillsList}>
              <p style={styles.skillItem}>Figma, Adobe Photoshop, Adobe Lightroom</p>
            </div>
          </div>

          <div style={styles.skillsGroup}>
            <p style={styles.skillsLabel}>Arquitectura y APIs</p>
            <div style={styles.skillsList}>
              <p style={styles.skillItem}>Monolitos Modulares, Microservicios, REST APIs (OpenAPI/Swagger), Programación Reactiva, SOLID</p>
            </div>
          </div>

          <div style={styles.skillsGroup}>
            <p style={styles.skillsLabel}>Bases de Datos y ORMs</p>
            <div style={styles.skillsList}>
              <p style={styles.skillItem}>Spring Data JPA (Hibernate), Prisma ORM, MySQL, MariaDB, PostgreSQL</p>
            </div>
          </div>

          <div style={styles.skillsGroup}>
            <p style={styles.skillsLabel}>Seguridad y Comunicación</p>
            <div style={styles.skillsList}>
              <p style={styles.skillItem}>Spring Security (JWT/OAuth2), RBAC, WebSockets</p>
            </div>
          </div>

          <div style={styles.skillsGroup}>
            <p style={styles.skillsLabel}>Flujo de Trabajo e IA</p>
            <div style={styles.skillsList}>
              <p style={styles.skillItem}>Agent Engineering, Git, Scrum</p>
            </div>
          </div>

          <div style={styles.skillsGroup}>
            <p style={styles.skillsLabel}>Calidad e Infraestructura</p>
            <div style={styles.skillsList}>
              <p style={styles.skillItem}>Docker, Docker Compose, JUnit 5, Mockito, Jest</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

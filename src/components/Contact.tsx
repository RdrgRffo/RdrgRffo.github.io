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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "40px",
  },
  heading: {
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "clamp(28px, 4.5vw, 56px)",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    color: T.black,
    lineHeight: 1.05,
    margin: 0,
    maxWidth: "600px",
  } as React.CSSProperties,
  right: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: "200px",
  } as React.CSSProperties,
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.gray,
    margin: 0,
  } as React.CSSProperties,
  email: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: T.black,
    textDecoration: "none",
    margin: 0,
  } as React.CSSProperties,
  socials: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  } as React.CSSProperties,
  socialLink: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: T.gray,
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    textAlign: "left",
  } as React.CSSProperties,
};

export default function Contact() {
  const [headingRef, headingVisible] = useReveal<HTMLHeadingElement>();

  return (
    <section style={styles.section} id="contact">
      <SectionDivider />
      <p style={styles.eyebrow} className="section-eyebrow">{"<Contacto />"}</p>
      <div style={styles.content}>
        <h2
          ref={headingRef}
          style={{ ...styles.heading, ...revealStyle(headingVisible) }}
        >
          Hablemos sobre tu próximo proyecto
        </h2>
        <div style={styles.right}>
          <div>
            <p style={styles.label}>Email</p>
            <a href="mailto:rriffo.99@gmail.com" style={styles.email}>
              rriffo.99@gmail.com
            </a>
          </div>
          <div style={styles.socials}>
            <p style={styles.label}>Redes</p>
            <a
              href="https://github.com/RdrgRffo/"
              style={styles.socialLink}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rodrigoriffo/"
              style={styles.socialLink}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

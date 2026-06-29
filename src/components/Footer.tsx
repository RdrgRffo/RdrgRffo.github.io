import { T } from "../tokens";

const styles: Record<string, React.CSSProperties> = {
  footer: {
    padding: "24px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    borderTop: `1px solid ${T.border}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: T.gray,
    margin: 0,
  } as React.CSSProperties,
  mono: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.gray,
    margin: 0,
  } as React.CSSProperties,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {year} Rodrigo Riffo</p>
      <p style={styles.mono}>Hecho con React</p>
    </footer>
  );
}

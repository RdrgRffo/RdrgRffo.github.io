import { useState, useEffect } from "react";
import { T } from "../tokens";

const styles = {
  nav: (scrolled: boolean): React.CSSProperties => ({
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 40px",
    background: scrolled
      ? "rgba(248,248,246,0.75)"
      : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
    transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.3s ease",
  }),
  logo: {
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: T.black,
    textDecoration: "none",
  } as React.CSSProperties,
  links: {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  } as React.CSSProperties,
  link: (isActive: boolean): React.CSSProperties => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: isActive ? T.black : T.gray,
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    position: "relative",
    transition: "color 0.3s ease",
  }),
  activeIndicator: {
    position: "absolute",
    bottom: "-4px",
    left: 0,
    height: "2px",
    background: T.accent,
    borderRadius: "1px",
    transition: "width 0.3s ease, left 0.3s ease",
  } as React.CSSProperties,
  mobileHidden: {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  } as React.CSSProperties,
};

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "projects", label: "Proyectos" },
  { id: "profile", label: "Perfil" },
  { id: "about", label: "Sobre mí" },
  { id: "contact", label: "Contacto" },
];

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav style={styles.nav(scrolled)}>
      <a href="#" style={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Rodrigo Riffo
      </a>
      <div style={styles.mobileHidden} className="nav-links">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            style={styles.link(activeSection === id)}
            className="nav-link-btn"
            onClick={() => onNavigate(id)}
          >
            {label}
            {activeSection === id && <span style={styles.activeIndicator} />}
          </button>
        ))}
      </div>
    </nav>
  );
}

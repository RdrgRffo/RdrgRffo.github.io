import { useCallback, useState, lazy, Suspense } from "react";
import { T } from "./tokens";
import projects from "./data/projects";
import { useModal } from "./hooks/useModal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load secciones que no están en el viewport inicial
const ProjectsGrid = lazy(() => import("./components/ProjectsGrid"));
const Profile = lazy(() => import("./components/Profile"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Modal = lazy(() => import("./components/Modal"));
const CustomCursor = lazy(() => import("./components/CustomCursor"));

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    color: T.black,
  },
  skipLink: {
    position: "absolute",
    top: "-100%",
    left: "8px",
    padding: "8px 16px",
    background: T.black,
    color: T.white,
    borderRadius: "4px",
    fontSize: "14px",
    zIndex: 1000,
    transition: "top 0.2s ease",
  } as React.CSSProperties,
};

export default function App() {
  const { selectedProject, isOpen, open, close } = useModal();
  const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0 });

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <ErrorBoundary>
      <div style={styles.app}>
        {/* Skip-to-content link para accesibilidad */}
        <a
          href="#main-content"
          style={styles.skipLink}
          onFocus={(e) => {
            e.currentTarget.style.top = "8px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.top = "-100%";
          }}
          onClick={(e) => {
            e.preventDefault();
            const main = document.getElementById("main-content");
            if (main) main.focus();
          }}
        >
          Saltar al contenido principal
        </a>

        <Navbar onNavigate={handleNavigate} />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Suspense fallback={null}>
            <ProjectsGrid
              projects={projects}
              onOpenProject={open}
              onCursorMove={setCursor}
            />
            <Profile />
            <About />
            <Contact />
          </Suspense>
        </main>
        <Footer />

        <Suspense fallback={null}>
          <CustomCursor
            visible={cursor.visible}
            x={cursor.x}
            y={cursor.y}
          />
        </Suspense>

        <Suspense fallback={null}>
          {isOpen && selectedProject && (
            <Modal project={selectedProject} onClose={close} />
          )}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

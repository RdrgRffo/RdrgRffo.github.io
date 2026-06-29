import { T } from "../tokens";
import { Project } from "../types";
import ProjectCard from "./ProjectCard";
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
    gap: "2px",
  },
};

interface ProjectsGridProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onCursorMove: (cursor: { visible: boolean; x: number; y: number }) => void;
}

export default function ProjectsGrid({ projects, onOpenProject, onCursorMove }: ProjectsGridProps) {
  const [sectionRef, sectionVisible] = useReveal<HTMLElement>({ threshold: 0.1 });
  const [contentRef, contentVisible] = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      style={styles.section}
      id="projects"
      className={`reveal${sectionVisible ? " reveal-visible" : ""}`}
    >
      <SectionDivider />
      <p style={styles.eyebrow}>{"<Proyectos />"}</p>
      <div ref={contentRef} style={revealStyle(contentVisible)}>
        <div style={styles.grid}>
          {projects.map((project, index) => {
            const isWide = index === projects.length - 1;
            return (
              <div
                key={project.id}
                className="project-card"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  gridColumn: isWide ? "span 2" : undefined,
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onOpen={onOpenProject}
                  isWide={isWide}
                  onCursorMove={onCursorMove}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

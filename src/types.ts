export interface ProjectImage {
  src: string;
  caption: string;
}

export interface ReadmeSection {
  heading: string;
  content?: string;
  bullets?: string[];
  code?: string;
  image?: string; // URL del diagrama/imagen (ej: diagrama de arquitectura)
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectMeta {
  period: string;
  duration: string;
  role: string;
  tools: string;
}

export interface ProjectReadme {
  summary: string;
  sections: ReadmeSection[];
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  coverColor: string;
  stack: string[];
  meta: ProjectMeta;
  images: ProjectImage[];
  readme: ProjectReadme;
  links: ProjectLink[];
}

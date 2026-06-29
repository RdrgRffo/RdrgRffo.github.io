import { useState, useCallback, useEffect } from "react";
import { Project } from "../types";

export function useModal() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isOpen = selectedProject !== null;

  const open = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const close = useCallback(() => {
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  return { selectedProject, isOpen, open, close };
}

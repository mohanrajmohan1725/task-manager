import { createContext, useContext, useState, useEffect } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);

  // 🔥 ONLY ID (correct approach)
  const [activeProjectId, setActiveProjectId] = useState(null);

  // ✅ ADD PROJECT
  const addProject = (name) => {
    const newProject = {
      id: Date.now().toString(),
      name,
    };

    setProjects((prev) => [...prev, newProject]);

    // 🔥 AUTO SELECT NEW PROJECT
    setActiveProjectId(newProject.id);

    return newProject;
  };

  // ✅ DELETE PROJECT
  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));

    // 🔥 RESET ACTIVE IF DELETED
    if (activeProjectId === id) {
      setActiveProjectId(null);
    }
  };

  // ✅ EDIT PROJECT
  const editProject = (id, newName) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, name: newName } : p
      )
    );
  };

  // 🔥 AUTO SELECT FIRST PROJECT (IMPORTANT UX)
  useEffect(() => {
    if (projects.length > 0 && !activeProjectId) {
      setActiveProjectId(projects[0].id);
    }
  }, [projects, activeProjectId]);

  // ✅ DERIVED ACTIVE PROJECT
  const activeProject = projects.find(
    (p) => p.id === activeProjectId
  );

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        editProject,

        activeProjectId,
        setActiveProjectId,
        activeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);
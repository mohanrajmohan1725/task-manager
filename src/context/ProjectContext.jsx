import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);

  // 🔥 store only projectId (simple & clean)
  const [activeProjectId, setActiveProjectId] = useState(null);

  // ✅ ADD PROJECT (return project)
  const addProject = (name) => {
    const newProject = {
      id: Date.now().toString(),
      name,
    };

    setProjects((prev) => [...prev, newProject]);

    return newProject; // 🔥 IMPORTANT
  };

  // ✅ DELETE PROJECT
  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));

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

  // ✅ GET ACTIVE PROJECT OBJECT (optional use)
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

        // 🔥 IMPORTANT
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
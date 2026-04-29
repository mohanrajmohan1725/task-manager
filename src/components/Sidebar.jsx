import { useState } from "react";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaBars,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const { filter, setFilter } = useTasks();
  const {
    projects,
    activeProject,
    setActiveProject,
    deleteProject,
    editProject,
  } = useProjects();

  return (
    <motion.div
      animate={{ width: open ? 256 : 64 }}
      className="bg-white dark:bg-gray-900 
      text-black dark:text-white 
      border-r dark:border-gray-700 
      min-h-screen p-4 transition-all duration-300"
    >
      {/* 🔝 Header */}
      <div className="flex items-center justify-between mb-6">
        {open && (
          <h2 className="text-xl font-bold tracking-wide">
            TaskFlow
          </h2>
        )}
        <FaBars
          className="cursor-pointer text-lg"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* 🔥 Filters */}
      <ul className="space-y-2 text-sm">
        {/* ALL */}
        <li
          onClick={() => {
            setFilter("all");
            setActiveProject(null);
          }}
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition
          ${
            filter === "all" && !activeProject
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <FaTasks />
          {open && "All Tasks"}
        </li>

        {/* COMPLETED */}
        <li
          onClick={() => {
            setFilter("completed");
            setActiveProject(null);
          }}
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition
          ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <FaCheckCircle />
          {open && "Completed"}
        </li>

        {/* PENDING */}
        <li
          onClick={() => {
            setFilter("pending");
            setActiveProject(null);
          }}
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition
          ${
            filter === "pending"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <FaClock />
          {open && "Pending"}
        </li>
      </ul>

      {/* 🔥 Projects */}
      <div className="mt-6">
        {open && (
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
            Projects
          </p>
        )}

        {projects.length === 0 && open && (
          <p className="text-gray-400 text-sm">No projects</p>
        )}

        {projects.map((p) => (
          <div
            key={p.id}
            className={`flex items-center justify-between p-2 rounded-lg mb-1 transition
            ${
              activeProject?.id === p.id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {/* NAME */}
            <span
              onClick={() => {
                setActiveProject(p);
                setFilter("all");
              }}
              className="cursor-pointer flex-1 truncate"
            >
              {open ? p.name : "📁"}
            </span>

            {/* ACTIONS */}
            {open && (
              <div className="flex gap-2 text-xs ml-2 opacity-70 hover:opacity-100 transition">

                {/* EDIT */}
                <button
                  onClick={() => {
                    const newName = prompt("Edit project name", p.name);
                    if (newName?.trim()) {
                      editProject(p.id, newName.trim());
                    }
                  }}
                  className="hover:text-yellow-400"
                >
                  ✏
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteProject(p.id)}
                  className="hover:text-red-400"
                >
                  ❌
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
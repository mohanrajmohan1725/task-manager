import { useState } from "react";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaBars,
  FaFolder,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const { filter, setFilter } = useTasks();

  // ✅ FIXED: use activeProjectId
  const {
    projects,
    activeProjectId,
    setActiveProjectId,
    deleteProject,
    editProject,
  } = useProjects();

  return (
    <motion.div
      animate={{ width: open ? 260 : 70 }}
      className="bg-white dark:bg-gray-900 
      text-black dark:text-white 
      border-r dark:border-gray-700 
      min-h-screen p-3 flex flex-col 
      transition-all duration-300"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        {open && (
          <h2 className="text-xl font-bold tracking-wide">
            TaskFlow 🚀
          </h2>
        )}

        <FaBars
          className="cursor-pointer text-lg hover:scale-110 transition"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* FILTERS */}
      <ul className="space-y-2 text-sm">

        {/* ALL */}
        <li
          onClick={() => {
            setFilter("all");
            setActiveProjectId(null); // ✅ FIX
          }}
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all
          ${
            filter === "all" && !activeProjectId
              ? "bg-blue-500 text-white shadow-md"
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
            setActiveProjectId(null);
          }}
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all
          ${
            filter === "completed"
              ? "bg-green-500 text-white shadow-md"
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
            setActiveProjectId(null);
          }}
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all
          ${
            filter === "pending"
              ? "bg-yellow-500 text-white shadow-md"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <FaClock />
          {open && "Pending"}
        </li>
      </ul>

      {/* PROJECT SECTION */}
      <div className="mt-6 flex-1 overflow-y-auto">

        {open && (
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
            Projects
          </p>
        )}

        {projects.length === 0 && open && (
          <p className="text-gray-400 text-sm text-center mt-3">
            No projects 🚀
          </p>
        )}

        {projects.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.03 }}
            className={`flex items-center justify-between p-2 rounded-lg mb-1 transition-all
            ${
              activeProjectId === p.id
                ? "bg-blue-500 text-white shadow-lg"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {/* NAME */}
            <div
              onClick={() => {
                setActiveProjectId(p.id); // ✅ FIXED
                setFilter("all");
              }}
              className="flex items-center gap-2 cursor-pointer flex-1 truncate"
            >
              <FaFolder />
              {open && <span className="truncate">{p.name}</span>}
            </div>

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
                  className="hover:text-yellow-400 hover:scale-110 transition"
                >
                  ✏
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteProject(p.id)}
                  className="hover:text-red-400 hover:scale-110 transition"
                >
                  ❌
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      {open && (
        <div className="text-xs text-gray-400 text-center mt-4">
          Made with ❤️
        </div>
      )}
    </motion.div>
  );
}
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";
import ProjectModal from "./ProjectModal";
import useDarkMode from "../hooks/useDarkMode";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useDarkMode();

  const dropdownRef = useRef();
  const notifyRef = useRef();
  const debounceRef = useRef();

  const navigate = useNavigate();
  const { setSearch } = useTasks();
  const { addProject } = useProjects();

  const user = auth.currentUser;

  // 🔍 Debounce search
  const handleSearch = (value) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 300);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // 🔥 Click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setNotifyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between 
        bg-white dark:bg-gray-800 
        p-4 rounded-xl shadow-md 
        border dark:border-gray-700 
        max-w-7xl mx-auto"
      >
        {/* 🔍 SEARCH */}
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg outline-none 
            bg-white dark:bg-gray-700 
            text-black dark:text-white 
            border-gray-300 dark:border-gray-600 
            focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 ml-6">

          {/* ➕ NEW PROJECT */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + New Project
          </motion.button>

          {/* 🔔 NOTIFICATIONS */}
          <div className="relative" ref={notifyRef}>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <FaBell
                className="text-gray-600 dark:text-gray-300 text-lg cursor-pointer"
                onClick={() => setNotifyOpen(!notifyOpen)}
              />
            </motion.div>

            <AnimatePresence>
              {notifyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-52 
                  bg-white dark:bg-gray-800 
                  text-black dark:text-white 
                  shadow-lg rounded-lg p-3 text-sm 
                  border dark:border-gray-700"
                >
                  No notifications
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 👤 PROFILE */}
          <div className="relative" ref={dropdownRef}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                src={user?.photoURL || "https://i.pravatar.cc/40"}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                {user?.displayName || "User"}
              </span>
            </motion.div>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-44 
                  bg-white dark:bg-gray-800 
                  text-black dark:text-white 
                  shadow-lg rounded-lg overflow-hidden text-sm 
                  border dark:border-gray-700"
                >
                  {/* PROFILE */}
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </button>

                  {/* SETTINGS */}
                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </button>

                  {/* 🌙 DARK MODE */}
                  <button
                    onClick={() => setDark(!dark)}
                    className="w-full text-left px-4 py-2 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dark Mode
                    {dark ? <FaSun /> : <FaMoon />}
                  </button>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      {showModal && (
        <ProjectModal
          onClose={() => setShowModal(false)}
          onAdd={(name) => addProject(name)}
        />
      )}
    </>
  );
}
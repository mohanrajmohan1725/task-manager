import { useState, useRef } from "react";
import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

function TaskInput() {
  const { addTask } = useTasks();
  const { activeProjectId } = useProjects();

  const [text, setText] = useState("");
  const [priority, setPriority] = useState("low");
  const [date, setDate] = useState("");

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ project இல்லனா stop
    if (!activeProjectId) {
      alert("⚠ Please select a project first!");
      return;
    }

    if (!text.trim()) return;

    const newTask = {
      text: text.trim(),
      priority,
      date,
      projectId: activeProjectId,
    };

    // reset
    setText("");
    setPriority("low");
    setDate("");

    addTask(newTask).catch((err) =>
      console.error("Add Task Error:", err)
    );

    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl 
      bg-white/70 dark:bg-gray-800/70 
      backdrop-blur-md
      p-5 rounded-2xl shadow-lg 
      border border-gray-200 dark:border-gray-700 
      transition"
    >
      {/* 🔥 TASK INPUT */}
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          activeProjectId
            ? "Enter your task..."
            : "⚠ Select a project from sidebar"
        }
        className="w-full p-3 border rounded-lg outline-none 
        bg-gray-50 dark:bg-gray-700 
        text-black dark:text-white 
        border-gray-300 dark:border-gray-600 
        focus:ring-2 focus:ring-blue-400 transition"
      />

      {/* 🔥 PRIORITY + DATE */}
      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded-lg 
          bg-white dark:bg-gray-700 
          text-black dark:text-white 
          border-gray-300 dark:border-gray-600"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded-lg 
          bg-white dark:bg-gray-700 
          text-black dark:text-white 
          border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* 🔥 BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full flex items-center justify-center gap-2 
        bg-blue-500 text-white px-5 py-2 rounded-lg 
        hover:bg-blue-600 shadow-md hover:shadow-lg transition"
      >
        <FaPlus />
        Add Task
      </motion.button>
    </form>
  );
}

export default TaskInput;
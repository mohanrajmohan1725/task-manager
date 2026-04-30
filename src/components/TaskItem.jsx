import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

function TaskItem({ task, deleteTask, toggleTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const inputRef = useRef(null);

  // sync text
  useEffect(() => {
    setNewText(task.text);
  }, [task.text]);

  // focus
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  // SAVE
  const handleSave = () => {
    if (!newText.trim()) {
      toast.error("Task cannot be empty ❌");
      return;
    }

    editTask(task.id, newText.trim());
    toast.success("Task updated ✏️");

    setIsEditing(false);
  };

  // DELETE
  const handleDelete = () => {
    deleteTask(task.id);
    toast.success("Task deleted 🗑");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`flex items-center justify-between gap-3 p-4 rounded-xl 
      border transition-all duration-300 cursor-pointer
      ${
        task.completed
          ? "bg-green-50/80 dark:bg-green-900/20 border-green-400"
          : "bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700"
      }
      hover:shadow-xl hover:border-blue-400`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">

        {/* CHECKBOX */}
        <input
          type="checkbox"
          checked={task.completed || false}
          onChange={() => toggleTask(task)}
          className="w-5 h-5 cursor-pointer accent-blue-500"
        />

        {/* TEXT / INPUT */}
        <div className="flex flex-col flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="p-1 border rounded 
              bg-white dark:bg-gray-700 
              text-black dark:text-white 
              border-gray-300 dark:border-gray-600"
            />
          ) : (
            <p
              className={`truncate font-medium transition-all ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800 dark:text-white"
              }`}
            >
              {task.text}
            </p>
          )}

          {/* INFO */}
          <div className="flex gap-2 mt-1 text-xs flex-wrap">
            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
              {task.priority}
            </span>

            {task.date && (
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                {task.date}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex gap-2 shrink-0">

        {/* EDIT / SAVE */}
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 rounded bg-blue-500 text-white 
              hover:scale-110 hover:shadow-md transition"
            >
              <FaSave size={14} />
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                setNewText(task.text);
              }}
              className="p-2 rounded bg-gray-400 text-white 
              hover:scale-110 hover:shadow-md transition"
            >
              <FaTimes size={14} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded bg-yellow-500 text-white 
            hover:scale-110 hover:shadow-md transition"
          >
            <FaEdit size={14} />
          </button>
        )}

        {/* DELETE */}
        <button
          onClick={handleDelete}
          className="p-2 rounded bg-red-500 text-white 
          hover:scale-110 hover:shadow-md transition"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export default TaskItem;
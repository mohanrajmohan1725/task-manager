import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

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

  // save
  const handleSave = () => {
    if (!newText.trim()) return;

    editTask(task.id, newText.trim());
    setIsEditing(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`flex items-center justify-between gap-3 p-4 rounded-xl shadow-sm border transition
      ${
        task.completed
          ? "bg-green-50 dark:bg-green-900/30 border-green-400"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      }`}
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
              className={`truncate font-medium ${
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

      {/* RIGHT ICON BUTTONS */}
      <div className="flex gap-2 shrink-0">

        {/* EDIT / SAVE */}
        {isEditing ? (
          <>
            <button
              title="Save"
              onClick={handleSave}
              className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              <FaSave size={14} />
            </button>

            <button
              title="Cancel"
              onClick={() => {
                setIsEditing(false);
                setNewText(task.text);
              }}
              className="p-2 rounded bg-gray-400 text-white hover:bg-gray-500"
            >
              <FaTimes size={14} />
            </button>
          </>
        ) : (
          <button
            title="Edit"
            onClick={() => setIsEditing(true)}
            className="p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
          >
            <FaEdit size={14} />
          </button>
        )}

        {/* DELETE */}
        <button
          title="Delete"
          onClick={() => deleteTask(task.id)}
          className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export default TaskItem;
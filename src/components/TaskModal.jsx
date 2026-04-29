import { useState } from "react";
import { motion } from "framer-motion";

export default function TaskModal({ task, onClose, onSave }) {
  const [text, setText] = useState(task.text);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* MODAL */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4 dark:text-white">
          Edit Task
        </h2>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded mb-4 
          bg-gray-50 dark:bg-gray-700 
          text-black dark:text-white"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!text.trim()) return;
              onSave(text);
              onClose();
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
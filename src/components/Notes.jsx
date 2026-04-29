import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Notes() {
  const [notes, setNotes] = useState([
    { text: "Landing Page For Website", done: false },
    { text: "Fixing icons with dark backgrounds", done: false },
    { text: "Improve user flow discussion", done: true },
  ]);

  const toggleNote = (index) => {
    const updated = [...notes];
    updated[index].done = !updated[index].done;
    setNotes(updated);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 
      p-5 rounded-xl shadow-md h-full 
      border border-gray-200 dark:border-gray-700 
      transition"
    >
      {/* HEADER */}
      <h2 className="font-semibold mb-4 text-gray-800 dark:text-white">
        Notes
      </h2>

      {/* LIST */}
      <div className="space-y-3">
        <AnimatePresence>
          {notes.map((note, i) => (
            <motion.label
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.01 }}
              className="flex items-start gap-3 cursor-pointer p-2 rounded-lg 
              hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={note.done}
                onChange={() => toggleNote(i)}
                className="mt-1 accent-purple-500 cursor-pointer"
              />

              {/* TEXT */}
              <span
                className={`text-sm transition ${
                  note.done
                    ? "line-through text-gray-400"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {note.text}
              </span>
            </motion.label>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Schedule() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Kickoff Meeting",
      time: "01:00 PM - 02:30 PM",
    },
    {
      id: 2,
      title: "Create Wordpress Website",
      time: "04:00 PM - 05:30 PM",
    },
  ]);

  const [newEvent, setNewEvent] = useState("");
  const inputRef = useRef(null);

  const addEvent = () => {
    if (!newEvent.trim()) return;

    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newEvent.trim(),
        time: "Custom Time",
      },
    ]);

    setNewEvent("");
    inputRef.current?.focus();
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 
      p-5 rounded-xl shadow-md 
      border border-gray-200 dark:border-gray-700 
      transition"
    >
      {/* HEADER */}
      <h2 className="font-semibold mb-4 text-gray-800 dark:text-white">
        Schedule
      </h2>

      {/* ADD EVENT */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addEvent()}
          placeholder="Add event..."
          className="border p-2 rounded-lg w-full text-sm outline-none
          bg-gray-50 dark:bg-gray-700 
          text-black dark:text-white 
          border-gray-300 dark:border-gray-600 
          focus:ring-2 focus:ring-blue-400 transition"
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={addEvent}
          className="bg-blue-500 text-white px-3 rounded-lg hover:bg-blue-600 transition"
        >
          +
        </motion.button>
      </div>

      {/* LIST */}
      <div className="space-y-3 text-sm">
        <AnimatePresence>
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.01 }}
              className="flex justify-between items-center p-3 rounded-lg 
              bg-gray-50 dark:bg-gray-700 
              hover:bg-gray-100 dark:hover:bg-gray-600 
              transition"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {event.title}
                </p>
                <p className="text-gray-400 text-xs">
                  {event.time}
                </p>
              </div>

              <button
                onClick={() => deleteEvent(event.id)}
                className="text-red-500 text-xs hover:underline"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
import { useTasks } from "../context/TaskContext";
import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem";

function TaskTable() {
  const {
    filteredTasks,
    toggleTask,
    deleteTask,
    editTask,
    tasks,
  } = useTasks();

  // 🔥 LOADING STATE (Firebase fetch)
  if (!tasks) {
    return (
      <div className="animate-pulse space-y-3 max-w-2xl mx-auto">
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">

      {/* 🔥 EMPTY STATE */}
      {filteredTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <div className="text-4xl mb-2">🚀</div>
          <p className="text-sm">
            No tasks in this project
          </p>
        </div>
      )}

      {/* 🔥 TASK LIST */}
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            layout // 🔥 smooth reordering
          >
            <TaskItem
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TaskTable;
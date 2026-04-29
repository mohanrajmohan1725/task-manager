import { useTasks } from "../context/TaskContext";
import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem"; // 🔥 IMPORTANT

function TaskTable() {
  const { filteredTasks, toggleTask, deleteTask, editTask } = useTasks();

  return (
    <div className="space-y-3 max-w-2xl mx-auto">

      {/* EMPTY STATE */}
      {filteredTasks.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No tasks yet 🚀
        </p>
      )}

      {/* TASK LIST */}
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25 }}
          >
            {/* 🔥 USE TaskItem HERE */}
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
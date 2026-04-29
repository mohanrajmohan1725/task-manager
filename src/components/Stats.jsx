import { useTasks } from "../context/TaskContext";
import { FaTasks, FaCheckCircle, FaClock } from "react-icons/fa";

export default function Stats() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

      {/* Total */}
      <div className="bg-white p-5 rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>
        <FaTasks className="text-blue-500 text-2xl" />
      </div>

      {/* Completed */}
      <div className="bg-white p-5 rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-2xl font-bold">{completed}</h2>
        </div>
        <FaCheckCircle className="text-green-500 text-2xl" />
      </div>

      {/* Pending */}
      <div className="bg-white p-5 rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold">{pending}</h2>
        </div>
        <FaClock className="text-yellow-500 text-2xl" />
      </div>

    </div>
  );
}
import TaskInput from "../components/TaskInput";
import TaskTable from "../components/TaskTable";
import TaskChart from "../components/TaskChart";
import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";

import Schedule from "../components/Schedule";
import Notes from "../components/Notes";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  FaTasks,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

function Home() {
  const { tasks } = useTasks();
  const { activeProject } = useProjects();

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 17) return "Good Afternoon 🌤️";
    if (hour < 21) return "Good Evening 🌆";
    return "Good Night 🌙";
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen 
    bg-gradient-to-br from-gray-100 to-gray-200 
    dark:from-gray-900 dark:to-black transition">

      {/* 📱 SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-6 space-y-6">

        <Navbar />

        <div className="max-w-6xl mx-auto space-y-8">

          {/* 🔥 HEADER */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 
          text-white p-5 md:p-6 rounded-2xl shadow-xl">

            <p className="opacity-80 text-sm md:text-base">{today}</p>

            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              {activeProject
                ? activeProject.name
                : `${getGreeting()} Mohan 👋`}
            </h1>

            {/* 📊 STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

              {/* TOTAL */}
              <div className="flex items-center gap-3 
              bg-white/10 backdrop-blur-md 
              border border-white/20 
              p-4 rounded-xl shadow-md 
              hover:scale-[1.03] transition">

                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <FaTasks className="text-blue-300 text-lg" />
                </div>

                <div>
                  <p className="text-xs md:text-sm opacity-70">Total</p>
                  <h2 className="text-lg md:text-xl font-bold">{tasks.length}</h2>
                </div>
              </div>

              {/* COMPLETED */}
              <div className="flex items-center gap-3 
              bg-green-400/10 backdrop-blur-md 
              border border-green-400/20 
              p-4 rounded-xl shadow-md 
              hover:scale-[1.03] transition">

                <div className="p-3 bg-green-400/20 rounded-lg">
                  <FaCheckCircle className="text-green-300 text-lg" />
                </div>

                <div>
                  <p className="text-xs md:text-sm opacity-70">Done</p>
                  <h2 className="text-lg md:text-xl font-bold">{completed}</h2>
                </div>
              </div>

              {/* PENDING */}
              <div className="flex items-center gap-3 
              bg-yellow-400/10 backdrop-blur-md 
              border border-yellow-400/20 
              p-4 rounded-xl shadow-md 
              hover:scale-[1.03] transition">

                <div className="p-3 bg-yellow-400/20 rounded-lg">
                  <FaHourglassHalf className="text-yellow-300 text-lg" />
                </div>

                <div>
                  <p className="text-xs md:text-sm opacity-70">Pending</p>
                  <h2 className="text-lg md:text-xl font-bold">{pending}</h2>
                </div>
              </div>

            </div>
          </div>

          {/* 📊 CHART */}
          <div className="bg-white dark:bg-gray-800 
          p-4 md:p-6 rounded-2xl shadow-lg">

            <h2 className="text-base md:text-lg font-semibold mb-3 dark:text-white">
              📊 Task Analytics
            </h2>

            <TaskChart />
          </div>

          {/* 📝 TASK SECTION */}
          <div className="bg-white dark:bg-gray-800 
          p-4 md:p-6 rounded-2xl shadow-lg space-y-4">

            <h2 className="text-base md:text-lg font-semibold dark:text-white">
              📝 Your Tasks
            </h2>

            <TaskInput />
            <TaskTable />
          </div>

          {/* 📅 EXTRA SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white dark:bg-gray-800 
            p-4 md:p-5 rounded-2xl shadow-lg">
              <h2 className="font-semibold mb-3 dark:text-white">
                📅 Schedule
              </h2>
              <Schedule />
            </div>

            <div className="bg-white dark:bg-gray-800 
            p-4 md:p-5 rounded-2xl shadow-lg">
              <h2 className="font-semibold mb-3 dark:text-white">
                🗒 Notes
              </h2>
              <Notes />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
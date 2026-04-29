import TaskInput from "../components/TaskInput";
import TaskTable from "../components/TaskTable";
import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";

import Schedule from "../components/Schedule";
import Notes from "../components/Notes";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"; // ✅ IMPORTANT

function Home() {
  const { tasks } = useTasks();
  const { activeProject } = useProjects();

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  // Greeting
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
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition">

      {/* ✅ NEW SIDEBAR */}
      <Sidebar />

      {/* 🔴 Main */}
      <div className="flex-1 p-6 space-y-4">

        <Navbar />

        <div className="max-w-4xl mx-auto space-y-4">

          <p className="text-gray-500 dark:text-gray-400">{today}</p>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold dark:text-white">
              {activeProject
                ? activeProject.name
                : `${getGreeting()} Mohan 👋`}
            </h1>

            <div className="flex gap-4 bg-white dark:bg-gray-800 px-5 py-2 rounded-xl shadow w-fit">
              <div className="dark:text-white">⏱ <b>{tasks.length}</b></div>
              <div className="dark:text-white">✔ <b>{completed}</b></div>
              <div className="dark:text-white">📊 <b>{pending}</b></div>
            </div>
          </div>

          {/* TASK */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md space-y-4">
            <TaskInput />
            <TaskTable />
          </div>

          {/* Schedule + Notes */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Schedule />
              <Notes />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
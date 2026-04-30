import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { useTasks } from "../context/TaskContext";

function TaskChart() {
  const { tasks } = useTasks();

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  // 🔥 Better colors
  const COLORS = ["#4ade80", "#facc15"];

  return (
    <div className="h-60 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          {/* 🔥 DONUT CHART */}
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}   // donut effect
            outerRadius={80}
            paddingAngle={4}   // spacing
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}

            {/* 🔥 CENTER TEXT */}
            <Label
              value={`${completed} / ${tasks.length}`}
              position="center"
              fill="#9ca3af"
              fontSize={16}
              fontWeight="bold"
            />
          </Pie>

          {/* 🔥 TOOLTIP */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskChart;
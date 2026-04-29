import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const columns = {
  todo: "📝 Todo",
  doing: "🚧 Doing",
  done: "✅ Done",
};

export default function Kanban() {
  const { tasks } = useTasks();

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    await updateDoc(doc(db, "tasks", taskId), {
      status: newStatus,
      completed: newStatus === "done",
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {Object.entries(columns).map(([key, title]) => {
          const columnTasks = tasks.filter((t) => t.status === key);

          return (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl min-h-[300px]"
                >
                  <h2 className="font-bold mb-3 dark:text-white">
                    {title}
                  </h2>

                  {columnTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {/* 🔥 USE TaskItem */}
                          <div className="mb-2">
                            {task.text}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  // 🔐 Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // 📥 Realtime fetch
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(data);
    });

    return () => unsub();
  }, [user]);

  // ➕ Add Task
  const addTask = async (task) => {
    if (!user) return;

    await addDoc(collection(db, "tasks"), {
      text: task.text,
      priority: task.priority || "low",
      date: task.date || "",
      completed: false,
      status: "todo", // 🔥 Kanban support
      uid: user.uid,
      createdAt: new Date(),
    });
  };

  // ❌ Delete
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  // ✅ Toggle complete
  const toggleTask = async (task) => {
    const newStatus = task.completed ? "todo" : "done";

    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed,
      status: newStatus,
    });
  };

  // ✏ Edit
  const editTask = async (id, newText) => {
    await updateDoc(doc(db, "tasks", id), {
      text: newText,
    });
  };

  // 🧹 Clear completed
  const clearCompleted = async () => {
    const completedTasks = tasks.filter((t) => t.completed);

    for (let t of completedTasks) {
      await deleteDoc(doc(db, "tasks", t.id));
    }
  };

  // 🔍 FILTER + SEARCH (FINAL LOGIC)
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.text
      ?.toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") return t.completed && matchesSearch;
    if (filter === "pending") return !t.completed && matchesSearch;

    return matchesSearch;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        clearCompleted,
        filter,
        setFilter,
        setSearch,
        setTasks, // for Kanban drag
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
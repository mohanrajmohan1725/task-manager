import { useState } from "react";

export default function ProjectModal({ onClose, onAdd }) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-lg w-80">

        <h2 className="text-lg font-semibold mb-4">New Project</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name..."
          className="border p-2 rounded w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  );
}
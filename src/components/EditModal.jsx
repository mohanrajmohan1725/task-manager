import { useState } from "react";

export default function EditModal({ task, onClose, onSave }) {
  const [text, setText] = useState(task.text);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg w-80">

        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave({ ...task, text })}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>

      </div>

    </div>
  );
}
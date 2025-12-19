import { useState } from "react";
import API from "../services/api";

const EditTaskModal = ({ task, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate?.slice(0, 10) || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/tasks/${task._id}`, form);
    onUpdated();
    onClose();
  };

  const inputStyle =
    "w-full border rounded px-3 py-2 " +
    "bg-white text-gray-900 placeholder-gray-500 " +
    "dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className={inputStyle}
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            className={inputStyle}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            className={inputStyle}
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            className={inputStyle}
            value={form.dueDate}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded
                         bg-gray-300 text-gray-900
                         dark:bg-gray-600 dark:text-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

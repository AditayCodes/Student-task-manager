import { useState } from "react";
import API from "../services/api";

const AddTaskForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", {
      ...form,
      completed: false, // ensure new task is pending
    });
    setForm({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
    onTaskAdded();
  };

  const inputStyle =
    "border rounded px-3 py-2 w-full " +
    "bg-white text-gray-900 placeholder-gray-500 " +
    "dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-700
                 border dark:border-gray-600
                 rounded-lg p-4 mb-6
                 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        className={inputStyle}
        placeholder="Task title"
        required
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <select
        className={inputStyle}
        value={form.priority}
        onChange={(e) =>
          setForm({ ...form, priority: e.target.value })
        }
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <textarea
        className={`${inputStyle} md:col-span-2`}
        placeholder="Task description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      {/* ✅ DUE DATE (REQUIRED) */}
      <input
        type="date"
        className={inputStyle}
        required
        value={form.dueDate}
        onChange={(e) =>
          setForm({ ...form, dueDate: e.target.value })
        }
      />

      <button
        type="submit"
        className="md:col-span-2 bg-blue-600 hover:bg-blue-700
                   text-white py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;

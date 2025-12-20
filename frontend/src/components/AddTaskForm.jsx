import { useState } from "react";
import API from "../services/api";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !dueDate) {
      alert("Title and Due Date are required");
      return;
    }

    try {
      await API.post("/tasks", {
        title,
        description,
        priority,
        dueDate,
      });

      // reset form
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");

      // refresh task list
      onTaskAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white dark:bg-gray-800
                 p-4 rounded shadow space-y-3"
    >
      <input
        className="w-full p-2 border rounded
                   bg-white dark:bg-gray-700
                   text-gray-900 dark:text-gray-100"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded
                   bg-white dark:bg-gray-700
                   text-gray-900 dark:text-gray-100"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded
                     bg-white dark:bg-gray-700
                     text-gray-900 dark:text-gray-100"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border rounded
                     bg-white dark:bg-gray-700
                     text-gray-900 dark:text-gray-100"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700
                   text-white py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;

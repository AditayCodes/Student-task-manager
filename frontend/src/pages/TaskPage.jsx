import { useEffect, useState } from "react";
import API from "../services/api";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Dark mode persistence
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const fetchTasks = async () => {
  let url = "/tasks";

  if (filter === "pending" || filter === "completed") {
    url += `?status=${filter}`;
  }

  if (filter.startsWith("sort-")) {
    const priority = filter.split("-")[1];
    url += `?sortPriority=${priority}`;
  }

  if (filter === "dueDate") {
    url += "?sortBy=dueDate";
  }

  const res = await API.get(url);
  setTasks(res.data);
};


  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 flex justify-center">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700
                       text-gray-900 dark:text-gray-100"
          >
            {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Student Task Manager
        </h1>

        <FilterBar setFilter={setFilter} />
        <AddTaskForm onTaskAdded={fetchTasks} />
        <TaskList tasks={tasks} onUpdate={fetchTasks} />
      </div>
    </div>
  );
};

export default TaskPage;

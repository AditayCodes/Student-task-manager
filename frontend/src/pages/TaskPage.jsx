import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import FilterBar from "../components/FilterBar";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // 🌙 APPLY DARK MODE
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
    let params = {};

    if (filter === "pending") params.status = "pending";
    if (filter === "completed") params.status = "completed";
    if (filter === "dueDate") params.sortBy = "dueDate";

    if (filter.startsWith("sort-")) {
      params.sortPriority = filter.replace("sort-", "");
    }

    const res = await API.get("/tasks", { params });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  // 🔍 SEARCH
  const filteredTasks = tasks.filter((task) => {
    const q = search.toLowerCase();
    return (
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q)
    );
  });

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // go back to login
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Student Task Manager
          </h1>

          <div className="flex gap-2">
            {/* DARK MODE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded text-sm
                         bg-gray-800 text-white
                         dark:bg-yellow-400 dark:text-black"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded text-sm
                         bg-red-600 text-white
                         hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ADD TASK */}
        <AddTaskForm onTaskAdded={fetchTasks} />

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-4 mb-4 p-2 rounded border
                     bg-white dark:bg-gray-800
                     text-gray-900 dark:text-gray-100
                     border-gray-300 dark:border-gray-700"
        />

        {/* FILTER + SORT */}
        <FilterBar setFilter={setFilter} />

        {/* TASK LIST */}
        <div className="space-y-4 mt-4">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No tasks found
            </p>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={fetchTasks}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default TaskPage;

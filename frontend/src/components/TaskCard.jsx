import { useState } from "react";
import API from "../services/api";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task, onUpdate }) => {
  const [showEdit, setShowEdit] = useState(false);

  const toggleStatus = async () => {
    await API.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    onUpdate();
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    onUpdate();
  };

  const priorityStyle = {
    high: "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200",
    medium:
      "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    low: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  return (
    <>
      <div
        className={`border rounded-lg p-4 shadow-sm
        bg-white dark:bg-gray-800
        dark:border-gray-700
        flex flex-col sm:flex-row justify-between gap-4
        ${task.completed ? "opacity-80" : ""}
      `}
      >
        {/* LEFT: TASK DETAILS */}
        <div>
          <h3
            className={`text-lg font-semibold ${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {task.title}
          </h3>

          <p
            className={`text-sm ${
              task.completed
                ? "text-gray-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {task.description}
          </p>

          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            Due: {task.dueDate?.slice(0, 10)}
          </p>

          {/* STATUS + PRIORITY */}
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`px-2 py-1 text-xs rounded font-medium ${
                task.completed
                  ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>

            <span
              className={`px-2 py-1 text-xs rounded font-medium ${
                priorityStyle[task.priority]
              }`}
            >
              {task.priority.toUpperCase()}
            </span>
          </div>
        </div>

        {/* RIGHT: ACTION BUTTONS */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleStatus}
            className={`px-3 py-1.5 text-sm rounded text-white ${
              task.completed
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {task.completed ? "Mark Pending" : "Mark Complete"}
          </button>

          <button
            onClick={() => setShowEdit(true)}
            className="px-3 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600
                     text-white rounded"
          >
            Edit
          </button>

          <button
            onClick={deleteTask}
            className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700
                     text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {showEdit && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEdit(false)}
          onUpdated={onUpdate}
        />
      )}
    </>
  );
};

export default TaskCard;

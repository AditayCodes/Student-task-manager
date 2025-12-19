import { useState } from "react";

const FilterBar = ({ setFilter }) => {
  const [active, setActive] = useState("all");
  const [showPriority, setShowPriority] = useState(false);

  const baseBtn =
    "px-4 py-2 rounded transition font-medium " +
    "bg-gray-200 text-gray-900 hover:bg-gray-300 " +
    "dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600";

  const activeBtn =
    "px-4 py-2 rounded transition font-medium " +
    "bg-blue-600 text-white";

  const handleClick = (type) => {
    setActive(type);
    setFilter(type === "all" ? "" : type);
    setShowPriority(false);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">

      {/* ALL */}
      <button
        onClick={() => handleClick("all")}
        className={active === "all" ? activeBtn : baseBtn}
      >
        All
      </button>

      {/* PENDING */}
      <button
        onClick={() => handleClick("pending")}
        className={active === "pending" ? activeBtn : baseBtn}
      >
        Pending
      </button>

      {/* COMPLETED */}
      <button
        onClick={() => handleClick("completed")}
        className={active === "completed" ? activeBtn : baseBtn}
      >
        Completed
      </button>

      {/* PRIORITY SORT */}
      <div className="relative">
        <button
          onClick={() => setShowPriority(!showPriority)}
          className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
        >
          Sort by Priority
        </button>

        {showPriority && (
          <div
            className="absolute mt-2 w-40 rounded shadow-lg z-10
                       bg-white text-gray-900
                       dark:bg-gray-800 dark:text-gray-100
                       border dark:border-gray-700"
          >
            {["high", "medium", "low"].map((p) => (
              <button
                key={p}
                onClick={() => {
                  setActive(`sort-${p}`);
                  setFilter(`sort-${p}`);
                  setShowPriority(false);
                }}
                className="block w-full text-left px-4 py-2
                           hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DUE DATE SORT */}
      <button
        onClick={() => {
          setActive("dueDate");
          setFilter("dueDate");
        }}
        className={
          active === "dueDate"
            ? activeBtn
            : "px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
        }
      >
        Sort by Due Date
      </button>
    </div>
  );
};

export default FilterBar;

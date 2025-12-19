import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
        No tasks found
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default TaskList;

const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL TASKS (with filters)
exports.getTasks = async (req, res) => {
  try {
    const { status, sortBy } = req.query;
    let filter = {};

    if (status === "completed") filter.completed = true;
    if (status === "pending") filter.completed = false;

    let query = Task.find(filter);

    if (sortBy === "priority") {
      query = query.sort({ priority: 1 });
    } else if (sortBy === "dueDate") {
      query = query.sort({ dueDate: 1 });
    }

    const tasks = await query;
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TASK
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

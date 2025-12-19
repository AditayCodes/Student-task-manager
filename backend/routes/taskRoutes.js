const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

/**
 * GET ALL TASKS (WITH FILTERS)
 */
router.get("/", async (req, res) => {
  try {
    const { status, sortPriority, sortBy } = req.query;

    let matchStage = {};

    if (status === "pending") matchStage.completed = false;
    if (status === "completed") matchStage.completed = true;

    // PRIORITY CUSTOM SORT
    let priorityOrder = ["high", "medium", "low"];
    if (sortPriority === "medium")
      priorityOrder = ["medium", "high", "low"];
    if (sortPriority === "low")
      priorityOrder = ["low", "medium", "high"];

    // DUE DATE SORT
    if (sortBy === "dueDate") {
      const tasks = await Task.find(matchStage).sort({ dueDate: 1 });
      return res.json(tasks);
    }

    // PRIORITY SORT (aggregation)
    const tasks = await Task.aggregate([
      { $match: matchStage },
      {
        $addFields: {
          priorityIndex: {
            $indexOfArray: [priorityOrder, "$priority"],
          },
        },
      },
      { $sort: { priorityIndex: 1 } },
      { $project: { priorityIndex: 0 } },
    ]);

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * CREATE TASK
 */
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * UPDATE TASK
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE TASK
 */
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

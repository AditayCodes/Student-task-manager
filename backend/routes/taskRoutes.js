const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

/**
 * GET ALL TASKS (WITH FILTERS) — PROTECTED
 */
router.get("/", auth, async (req, res) => {
  try {
    const { status, sortBy, sortPriority } = req.query;

    let query = { userId: req.userId };

    // FILTER
    if (status === "pending") query.completed = false;
    if (status === "completed") query.completed = true;

    // SORT BY DUE DATE
    if (sortBy === "dueDate") {
      const tasks = await Task.find(query).sort({ dueDate: 1 });
      return res.json(tasks);
    }

    // PRIORITY SORT
    let priorityOrder = ["high", "medium", "low"];

    if (sortPriority === "medium")
      priorityOrder = ["medium", "high", "low"];

    if (sortPriority === "low")
      priorityOrder = ["low", "medium", "high"];

    const tasks = await Task.aggregate([
      { $match: query },
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
 * CREATE TASK — PROTECTED
 */
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.userId,     // 🔐 owner ID
      userName: req.userName // 👈 store owner name
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
 * UPDATE TASK — PROTECTED & OWNERSHIP CHECK
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // 🔐 ownership
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE TASK — PROTECTED & OWNERSHIP CHECK
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId, // 🔐 ownership
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

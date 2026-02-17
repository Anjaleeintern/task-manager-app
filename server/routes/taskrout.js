const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/jwtMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/", auth, async (req, res) => {
  try {
    const { title, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date required" });
    }

    const task = await Task.create({
      title,
      date,
      user: req.userId
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET USER TASKS ONLY
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId })
      .sort({ date: 1 });

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE TASK (ONLY OWNER)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Task not found" });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE TASK (ONLY OWNER)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!deleted)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

/* 🔑 VERY IMPORTANT — BODY PARSING FIRST */
app.use(cors({ origin: "*" }));
app.use(express.json()); // 👈 MUST be before routes

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.send("Student Task Manager API running...");
});

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error(err));

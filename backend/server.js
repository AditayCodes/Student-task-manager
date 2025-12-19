const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Student Task Manager API running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => console.error(err));

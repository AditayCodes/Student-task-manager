const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* Routes */
const taskRoutes = require("./routes/taskRoutes");
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

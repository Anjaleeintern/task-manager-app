require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

    app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/task", require("./routes/taskrout"));
  

app.listen(5000, () => console.log("Server running"));

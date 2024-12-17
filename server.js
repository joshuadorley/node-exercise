import express from "express";
import config from "./config";
import router from "./routes/index.js"; // Import the router from routes/index.js

const app = express();

app.use(express.json());

// Use the imported router to handle all requests under "/api"
app.use("/api", router);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ name: err.name, msg: err.message });
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}...`);
});

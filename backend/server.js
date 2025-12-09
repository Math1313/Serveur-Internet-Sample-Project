import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend actif" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend écoute sur ${PORT}`));

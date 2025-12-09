import express from "express";
import fallbackTasks from "../fallbackData.js";
import { getDB } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const db = await getDB();

  if (!db) {
    return res.json(fallbackTasks);
  }

  const [rows] = await db.query("SELECT * FROM tasks");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Le champ 'text' est requis" });
  }

  const db = await getDB();

  if (!db) {
    const nextId = fallbackTasks.length
      ? Math.max(...fallbackTasks.map((t) => t.id)) + 1
      : 1;

    const newTask = { id: nextId, text: text.trim() };
    fallbackTasks.push(newTask);
    return res.status(201).json({ success: true, task: newTask, fallback: true });
  }

  await db.query("INSERT INTO tasks (text) VALUES (?)", [text]);
  res.status(201).json({ success: true });
});

export default router;

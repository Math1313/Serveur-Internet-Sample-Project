import mysql from "mysql2/promise";


let db = null;

async function connectDB() {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "example",
      database: process.env.DB_NAME || "tasksdb",
    });

    // Test connection
    await db.query("SELECT 1");
    console.log("🎉 Connexion DB établie");
    return db;

  } catch (err) {
    console.log("⚠️ Base de données non disponible, fallback activé");
    db = null;
    return null;
  }
}

export async function getDB() {
  if (!db) await connectDB();
  return db;
}

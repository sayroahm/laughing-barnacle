const express = require("express");
const mysql = require("mysql2/promise");
const app = express();

let db;
async function initDB() {
  db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  console.log("Connected to MySQL!");
}
initDB();

app.get("/api/data", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM data");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
  } catch (err) {
    res.status(500).send(JSON.stringify({ error: err.message }));
  }
});

app.all("*", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(403).send(JSON.stringify({ "errors": [ { "code": 0, "message": "" } ] }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

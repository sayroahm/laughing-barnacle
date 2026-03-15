const express = require("express");
const app = express();

app.get("/api/data", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ name: "Evan", status: "online" }, null, 2));
});

app.all("*", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify(
    {"errors":[{"code":0,"message":""}]}
, null, 2));
});

// Listen on Railway port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

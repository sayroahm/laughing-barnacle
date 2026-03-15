const express = require("express");
const app = express();

app.all("*", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(451).send(JSON.stringify({ "errors": [ { "code": 0, "message": "" } ] }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const express = require("express");
const app = express();
const db = require("./db");
const morgan = require("morgan");
const faker = require("faker");
const pg = require("pg");

app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ error: err.message ? err.message : err.toString() });
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
  console.log("synced");
  app.listen(port, () => console.log(`listening on port ${port}`));
});

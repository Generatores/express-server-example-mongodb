require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const db = require("./db");
db;

const Users = require("./routes/users");
app.use("/users", Users);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

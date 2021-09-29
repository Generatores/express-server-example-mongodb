require("dotenv").config();

//* Declaration of main requirements
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("public"));

//* Declaration of MongoDB
const db = require("./db");
db;

const Users = require("./routes/users");
app.use("/users", Users);

//* Declaration of file uploader

const Uploads = require("./routes/uploads");
app.use("/uploads", Uploads);

//* Trigger of Express server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

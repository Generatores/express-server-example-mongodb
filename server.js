require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const mongoose = require("mongoose");

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connection to DB successfull..."));

const Users = require("./routes/users");
app.use("/users", Users);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");
// const USER = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy
app.use(require("./router/auth"));

const PORT = process.env.PORT;

// app.get("/about", (req, res) => {
//   res.send("Hello about world from the server");
// });
// app.get("/contact", (req, res) => {
//   res.send("Hello contact world from the server");
// });
app.get("/signin", (req, res) => {
  res.send("Hello login world from the server");
});
app.get("/signup", (req, res) => {
  res.send("Hello registration world from the server");
});

app.listen(PORT, () => {
  console.log(`server is running on port no ${PORT}`);
});

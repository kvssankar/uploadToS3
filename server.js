const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");

// s3Upload Middleware
const { upload } = require("./api/middleware/s3uploadClient");

const app = express();

// EJS
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname)));

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("resume"), (req, res) => {
  console.log(req.file.location);
  res.render("home");
});

const port = process.env.PORT || 3000;

app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting the server!!");
  } else {
    console.log(`Server started on port: ${port}`);
  }
});

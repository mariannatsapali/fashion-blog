//jshint esversion:6

// Required packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Create an Express application
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Use body-parser middleware for parsing URL-encoded data
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Serve static files from the "public" directory
app.use(express.static("public"));

// Function for handling "Read more" and "Read less" functionality
function readMoreReadLess() {
  // Get references to HTML elements by ID
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("moreLessBtn");

  // Check if the dots are currently hidden
  if (dots.style.display === "none") {
    // If hidden, show dots, change button text to "Read more", and hide additional text
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    // If dots are visible, hide dots, change button text to "Read less", and show additional text
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

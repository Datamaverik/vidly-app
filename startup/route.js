const express = require("express");
const genre = require("../routes/genres.js");
const customer = require("../routes/customers.js");
const movie = require("../routes/movies.js");
const rental = require("../routes/rentals.js");
const home = require("../routes/home.js");
const user = require("../routes/user.js");
const auth = require("../routes/auth.js");
const error = require("../middleware/error.js");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", home);
  app.use("/api/genres", genre);
  app.use("/api/customers", customer);
  app.use("/api/movies", movie);
  app.use("/api/rentals", rental);
  app.use("/api/users", user);
  app.use("/api/auth", auth);

  app.use(error);
};

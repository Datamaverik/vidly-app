const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();
const asyncMiddleware = require("../middleware/async");
const mongoose = require("mongoose");
const { Genre, validateGenres } = require("../models/genres");

//get all the genres
router.get("/", async (req, res) => {
  res.send(await Genre.find().sort("genre"));
});

//get a specific genre
router.get("/:id", async (req, res) => {
  //  validating the id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID.");
  }

  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the give ID was not found!");
  res.send(genre);
});

//create a new genre
router.post("/", auth, async (req, res) => {
  //  validating the req body
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    genre: req.body.genre,
  });
  const result = await genre.save();
  res.send(result);
});

//update a specific genre
router.put("/:id", auth, async (req, res) => {
  //  validating the id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID.");
  }
  //  validating the req body
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        genre: req.body.genre,
      },
    },
    { new: true }
  );
  res.send(genre);
});

//delete a specific genre
router.delete("/:id", [auth, admin], async (req, res) => {
  //  validating the id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID.");
  }

  const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
  if (!genre)
    return res.status(404).send("The genre with the give ID was not found!");
  res.send(genre);
});

module.exports = router;

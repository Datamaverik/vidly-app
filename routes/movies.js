const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Movie, validate } = require("../models/movies");
const { Genre } = require("../models/genres");

//  get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("numberInStock");
  res.send(movies);
});

//  get a specific movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById({ _id: req.params.id });
    if (!movie)
      return res.status(404).send("The movie with the given id wasn't found");
    res.send(movie);
  } catch (ex) {
    console.error(ex.message);
  }
});

//  create a movie
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Ivalid genre");

  try {
    const movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        genre: genre.genre,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();
    res.send(movie);
  } catch (ex) {
    console.error(ex.message);
    res.status(400).send(ex.message);
  }
});

//  update a movie
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Ivalid genre");
  try {
    const movie = await Movie.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          genre: {
            _id: genre._id,
            genre: genre.genre,
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate,
        },
      },
      { new: true }
    );
    if (!movie)
      return res.status(404).send("The movie with the given id was not found");
    res.send(movie);
  } catch (ex) {
    console.error(ex.message);
  }
});

//  delete a movie
router.delete("/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete({ _id: req.params.id });
    res.send(movie);
  } catch (ex) {
    console.error(ex.message);
    return res.status(404).send("The movie with the given id was not found");
  }
});

module.exports = router;

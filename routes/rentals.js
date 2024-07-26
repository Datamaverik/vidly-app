const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Rental, validate } = require("../models/rentals");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movies");

//  get all rentals
router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

//  get a specific rental
router.get("/:id", async (req, res) => {
  try {
    const rental = await Rental.findById({ _id: req.params.id });
    if (!rental)
      return res.status(404).send("The rental with the given id wasn't found");
    res.send(rental);
  } catch (ex) {
    console.error(ex.message);
  }
});

//  create a rental
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Ivalid customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");
  if (movie.numberInStock === 0)
    return res.status(400).send("Movie is not in stock.");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    await rental.save();
    movie.numberInStock--;
    await movie.save();
    res.send(rental);
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send(ex.message);
  }
});

//  delete a rental
router.delete("/:id", async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete({ _id: req.params.id });
    res.send(rental);
  } catch (ex) {
    console.error(ex.message);
    return res.status(404).send("The rental with the given id was not found");
  }
});

module.exports = router;

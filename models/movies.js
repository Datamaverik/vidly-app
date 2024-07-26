const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
    maxLength: 255,
  },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

//  server side validation to save as a doc in mongoDb
const Movie = mongoose.model("Movie", movieSchema);

//  client side validation
function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required().min(3),
    genreId: Joi.objectId().required(), //  cause we want the client to send only an id
    numberInStock: Joi.number().required().min(0),
    dailyRentalRate: Joi.number().required().min(0),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
exports.movieSchema = movieSchema;

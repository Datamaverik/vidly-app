const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  genre: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenres(genre) {
  const schema = Joi.object({
    genre: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validateGenres = validateGenres;
exports.genreSchema = genreSchema;

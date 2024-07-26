const mongoose = require("mongoose");
const Joi = require("joi");

// const { customerSchema } = require("./customer");
// const { movieSchema } = require("./movies");
/** 
    we don't reuse the previously defined schema because
    they have lots of properties, we only need few of the
    properties here so we defined new custom schema
**/

const customerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, minLength: 3, maxLength: 255 },
  phone: { type: Number, required: true, min: 1000000000, max: 9999999999 },
});

const movieSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, require: true, minLength: 5, maxLength: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

//  server side validation to save as a doc in mongoDb
const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: customerSchema,
      required: true,
    },
    movie: {
      type: movieSchema,
      required: true,
    },
  })
);

//  client side validation
function validateRental(movie) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(movie);
}

exports.Rental = Rental;
exports.validate = validateRental;

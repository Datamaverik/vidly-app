const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const passwordComplexity = require("joi-password-complexity");
const { lowerCase, upperCase } = require("lodash");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 255,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User email is required"],
    maxLength: 255,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, minLength: 7, maxLength: 1024 },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().max(255).required().min(5).email(),
    password: passwordComplexity({
      min: 5,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
    }),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;

const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();
const { User } = require("../models/user");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

//  authenticate the user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().max(255).required().min(5).email(),
    password: passwordComplexity({
      min: 5,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
    }),
  });

  return schema.validate(req);
}

module.exports = router; 
const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true },
  name: { type: String, minLength: 3, required: true },
  phone: { type: Number, min: 1000000000, max: 9999999999, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.number().min(1000000000).max(9999999999).required(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.customerSchema = customerSchema;

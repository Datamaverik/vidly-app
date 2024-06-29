const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

//  get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

//  get a specific customer
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById({ _id: req.params.id });
    res.send(customer);
  } catch (ex) {
    console.error(ex.message);
    res.status(404).send("The customer with the given id was not found");
  }
});

//  create a customer
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const customer = new Customer({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    });
    const result = await customer.save();
    res.send(result);
  } catch (ex) {
    console.error(ex.message);
    res.status(400).send(ex.message);
  }
});

//  update a customer
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  try {
    const customer = Customer.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isGold: req.body.isGold,
          name: req.body.name,
          phone: req.body.phone,
        },
      },
      { new: true }
    );
    res.send(customer);
  } catch (ex) {
    console.error(ex.message);
    return res.status(404).send("The customer with the given id was not found");
  }
});

//  delete a customer
router.delete("/:id", auth, async (req, res) => {
  try {
    const customer = Customer.findByIdAndDelete({ _id: req.params.id });
    res.send(customer);
  } catch (ex) {
    console.error(ex.message);
    return res.status(404).send("The customer with the given id was not found");
  }
});

module.exports = router;

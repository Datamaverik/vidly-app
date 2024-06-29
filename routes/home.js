const express = require('express');
const router = express.Router();

//root
router.get("/", (req, res) => {
  res.send("Welcome to this app!");
});

module.exports = router;
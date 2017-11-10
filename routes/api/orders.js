var express = require("express");
var router = express.Router();

// GEt all orders
router.get("/orders", function(req, res) {
  res.json({});
});

// Get orders id = :id
router.get("/orders/:id", function(req, res) {
  res.json({});
});

// Create an order
router.post("/orders", function(req, res) {
  res.json({});
});

// Delete order id = :id
router.delete("/orders/:id", function(req, res) {
  res.json({});
});

// Delete all orders
router.delete("/orders", function(req, res) {
  res.json({});
});

module.exports = router;

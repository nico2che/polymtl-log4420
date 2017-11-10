var express = require("express");
var router = express.Router();

// GEt all product in shopping cart
router.get("/shopping-cart", function(req, res) {
  res.json({});
});

// Get product id = :productId in shopping-cart
router.get("/shopping-cart/:productId", function(req, res) {
  res.json({});
});

// Add a product in shopping cart
router.post("/shopping-cart/", function(req, res) {
  res.json({});
});

// Update quantity product :productId in shopping cart
router.put("/shopping-cart/:productId", function(req, res) {
  res.json({});
});

// Delete product id = :productId in shopping cart
router.delete("/shopping-cart/:productId", function(req, res) {
  res.json({});
});

// Delete all products in shopping cart
router.delete("/shopping-cart", function(req, res) {
  res.json({});
});

module.exports = router;

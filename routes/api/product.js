var express = require("express");
var router = express.Router();
var Product = require("../../models/Product")

// GEt all products
router.get("/products", (req, res) => {
  let query = {}
  if (req.query.category) {
    const category = req.query.category;
    if (["cameras", "computers", "consoles", "screens"].includes(category)) {
        query.category = category;
    } else
      return res.status(400).json({"error": "Invalid value for parameter category"})
  }
  Product.find(query).exec((err, products) => {
    if (err)
      res.status(500).json({"error": err})
    else {
      // If sorting products
      if (req.query.criteria && ['name', 'price'].includes(req.query.criteria) && req.query.orderBy) {
        const on = req.query.orderBy === 'asc' ? 1 : -1;
        const criteria = req.query.criteria;
        products.sort((p1, p2) => {
          p1 = criteria === 'name' ? p1[criteria].toLowerCase() : p1[criteria];
          p2 = criteria === 'name' ? p2[criteria].toLowerCase() : p2[criteria];
          return p1 > p2 ? on : -on;
        });
        res.json(products);
      } else {
        res.json(products);
      }
    }
  })
});

// Get product id = :id
router.get("/products/:id", function(req, res) {
  Product.findOne({ id: req.params.id }).exec((err, product) => {
    if (err) res.status(500).json({"error": err})
    if (product)
      res.json(product);
    else
      res.status(404).send()
  })
});

// Create a product
router.post("/products", function(req, res) {
  const product = new Product(req.body);
  product.save((err, product) => {
    if (err)
      res.status(500).json({"error": err})
    else
      res.status(201).json(product);
  })
});

// Delete product id = :id
router.delete("/products/:id", function(req, res) {
  Product.remove({ id: req.params.id }, (err) => {
    if (err)
      res.status(500).json({"error": err})
    else
      res.status(204).send();
  })
});

// Delete all products
router.delete("/products", function(req, res) {
  Product.remove({}, (err) => {
    if (err)
      res.status(500).json({"error": err})
    else
      res.status(204).send();
  })
});

module.exports = router;

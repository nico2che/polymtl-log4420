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
  let sort = {}
  if (req.query.criteria) {
    switch(req.query.criteria) {
      case "alpha-asc": sort.name = 1; break;
      case "alpha-dsc": sort.name = -1; break;
      case "price-asc": sort.price = 1; break;
      case "price-dsc": sort.price = -1; break;
      default:
        return res.status(400).json({"error": "Invalid value for parameter criteria"})
        break;
    }
  }
  Product.find(query).sort(sort).exec((err, products) => {
    if (err) console.error(err);
    res.json(products);
  })
});

// Get product id = :id
router.get("/products/:id", function(req, res) {
  Product.findOne({ id: req.params.id }).exec((err, product) => {
    if (err) console.error(err);
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
    if (err) res.status(400).json({"error": err})
    res.status(201).json(product);
  })
});

// Delete product id = :id
router.delete("/products/:id", function(req, res) {
  Product.remove({ id: req.params.id }, (err) => {
    if (err) res.status(400).json({"error": err})
    res.status(204).send();
  })
});

// Delete all products
router.delete("/products", function(req, res) {
  Product.remove({}, (err) => {
    if (err) res.status(400).json({"error": err})
    res.status(204).send();
  })
});

module.exports = router;

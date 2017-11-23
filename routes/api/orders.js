var express = require("express")
    , router = express.Router()
    , Order = require("../../models/Order")

// GEt all orders
router.get("/orders", function(req, res) {
  Order.find().exec((err, orders) => {
    if (err) res.status(400).json({"error": err})
    res.json(orders);
  })
});

// Get orders id = :id
router.get("/orders/:id", function(req, res) {
  Order.findOne({ id: req.params.id }).exec((err, order) => {
    if (err) res.status(400).json({"error": err})
    if (order)
      res.json(order);
    else
      res.status(404).send()
  })
});

// Create a order
router.post("/orders", function(req, res) {
  const order = new Order(req.body);
  order.save((err, order) => {
    if (err) res.status(400).json({"error": err})
    res.status(201).json(order);
  })
});

// Delete order id = :id
router.delete("/orders/:id", function(req, res) {
  order.remove({ id: req.params.id }, (err) => {
    if (err) res.status(400).json({"error": err})
    res.status(204).send();
  })
});

// Delete all orders
router.delete("/orders", function(req, res) {
  order.remove({}, (err) => {
    if (err) res.status(400).json({"error": err})
    res.status(204).send();
  })
});

module.exports = router;

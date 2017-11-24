var express = require("express")
    , router = express.Router()
    , _ = require('validator')
    , Order = require("../../models/Order")

// GEt all orders
router.get("/orders", function(req, res) {
  Order.find().exec((error, orders) => {
    if (error)
      res.status(500).json({ error }) // Check error
    else
      res.json(orders);
  })
});

// Get orders id = :id
router.get("/orders/:id", function(req, res) {
  const id = parseInt(req.params.id);
  Order.findOne({ id }).exec((error, order) => {
    if (error) res.status(500).json({ error }) // Check error
    if (order)
      res.json(order);
    else
      res.status(404).send()
  })
});

// Create a order
router.post("/orders", function(req, res) {
  // Get all parameters sent
  const { firstName, lastName, email, phone, products } = req.body;
  // Check all parameters
  if (firstName && lastName && _.isEmail(email) && _.isMobilePhone(phone, 'any')
        && typeof products === 'object' && products.length > 0) {
    // Get the last order
    Order.findOne().sort({ id: -1 }).exec((error, lastOrder) => {
      if (error) res.status(500).json({ error }) // Check error
      // Define new ID
      const id = lastOrder ? ++lastOrder.id : 1;
      // Create new order with all info and new id
      const order = new Order({ ...req.body, id });
      order.save((error, order) => {
        if (error) res.status(500).json({ error })
        res.status(201).json(order); // Save and send
      })
    })
  } else {
    res.status(400).send()
  }
});

// Delete order id = :id
router.delete("/orders/:id", function(req, res) {
  const id = parseInt(req.params.id);
  Order.findOne({ id }).exec((error, orderToRemove) => {
    if (error) res.status(500).json({ error }) // Check error
    if (orderToRemove) { // Ok, this order exists, remove it
      Order.remove({ id }, (error) => {
        if (error) res.status(500).json({ error })
        res.status(204).send();
      })
    } else {
      res.status(404).send(); // No order with this :id
    }
  })
});

// Delete all orders
router.delete("/orders", function(req, res) {
  Order.remove({}, (error) => {
    if (error) res.status(500).json({ error })
    res.status(204).send();
  })
});

module.exports = router;

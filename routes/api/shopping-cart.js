var express = require("express")
    , router = express.Router();

getProduct = (req, productId) => {
  const product = (req.session.cart || []).filter(p => p.productId === productId);
  return product.length !== 0 ? product : false;
}

// GEt all product in shopping cart
router.get("/shopping-cart", function(req, res) {
  if (typeof req.session.cart !== "object") req.session.cart = [];
  res.json(req.session.cart);
});

// Get product id = :productId in shopping-cart
router.get("/shopping-cart/:productId", function(req, res) {
  const product = getProduct(req, parseInt(req.params.productId));
  res.status(product ? 200 : 404).json(product || []);
});

// Add a product in shopping cart
router.post("/shopping-cart/", function(req, res) {
  const productId = parseInt(req.body.productId)
        , quantity = parseInt(req.body.quantity);
  // Check sent parameters
  if (quantity && productId) {
    if (getProduct(req, productId)) // If exists, increment it
      req.session.cart = req.session.cart.map(p => p.productId === productId ? { productId, quantity: quantity + p.quantity } : p);
    else // Else, create it
      req.session.cart = (req.session.cart || []).concat({ productId, quantity })
    res.json(req.session.cart); // new cart
  } else {
    res.status(400).send(); // error in parameters
  }
});

// Update quantity product :productId in shopping cart
router.put("/shopping-cart/:productId", function(req, res) {
  const productId = parseInt(req.params.productId)
        , quantity = parseInt(req.body.quantity);
  // Check sent parameters
  if (quantity && productId) {
    if (getProduct(req, productId)) { // If exists, replace quantity
      req.session.cart = req.session.cart.map(p => p.productId === productId ? { productId, quantity } : p);
      res.status(204).send();
    } else { // Else, error not found!
      res.status(404).send();
    }
  } else {
    res.status(400).send(); // error in parameters
  }
});

// Delete product id = :productId in shopping cart
router.delete("/shopping-cart/:productId", function(req, res) {
  const productId = parseInt(req.params.productId);
  // Check sent parameters
  if (getProduct(req, productId)) { // If exists, keep all other products
    req.session.cart = req.session.cart.filter(p => p.productId !== productId);
    res.status(204).send();
  } else { // Else, error not found!
    res.status(404).send();
  }
});

// Delete all products in shopping cart
router.delete("/shopping-cart", function(req, res) {
  // Replace with empty array
  req.session.cart = [];
  res.status(204).send();
});

module.exports = router;

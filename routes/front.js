var express = require("express");
var router = express.Router();

router.get(/^\/(accueil)?$/, function(req, res) {
  res.render("index");
});

router.get("/contact", function(req, res) {
  res.render("contact", { title: "Produit" });
});

router.get("/produits", function(req, res) {
  res.render("products", { title: "Produits" });
});

router.get("/produit", function(req, res) {
  res.render("product", { title: "Produit" });
});

router.get("/panier", function(req, res) {
  res.render("shopping-cart", { title: "Produit" });
});

router.get("/commande", function(req, res) {
  res.render("order", { title: "Produit" });
});

router.get("/confirmation", function(req, res) {
  res.render("confirmation", { title: "Produit" });
});


module.exports = router;

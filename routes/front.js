var express = require("express");
var router = express.Router();

router.get(/^\/(accueil)?$/, function(req, res) {
  res.render("index"), { title: "Accueil" };
});

router.get("/contact", function(req, res) {
  res.render("contact", { title: "Contact" });
});

router.get("/produits", function(req, res) {
  res.render("products", { title: "Produits" });
});

router.get("/produit", function(req, res) {
  res.render("product", { title: "Produit" });
});

router.get("/panier", function(req, res) {
  res.render("shopping-cart", { title: "Panier" });
});

router.get("/commande", function(req, res) {
  res.render("order", { title: "Commande" });
});

router.get("/confirmation", function(req, res) {
  res.render("confirmation", { title: "Confirmation de commande" });
});


module.exports = router;

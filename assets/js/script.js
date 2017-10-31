"use strict";

var Storage = (function(){
    
    var products = null;
    
    /**
     * Return product count
     */
    function length() {
        // if(!products)
        //     get();
        return Object.keys(products).length ? Object.values(products).reduce((p1, p2) => p1 + p2) : 0;
    }

    /**
     * Get all articles
     */
    function getProducts() {
        if (products) {
            return products;
        } else {
            var cart = localStorage.getItem('cart');
            products = cart ? JSON.parse(cart) : {};
            updateCounter();
            return products;
        }
    }

    /**
     * Add or remove specific article, x time
     * @param {int} number 
     * @param {int} article 
     */
    function setProduct(number, article) {
        number = parseInt(number);
        products[article] = products[article] ? products[article] + number : number;
        updateCounter();
        localStorage.setItem('cart', JSON.stringify(products));
        return this;
    }
    
    /**
     * Remove all specific article
     * @param {int} article 
     */
    function removeProduct(article) {
        delete products[article]; // Remove article
        updateCounter();
        localStorage.setItem('cart', JSON.stringify(products)); // Save
        return this;
    }
        
    /**
     * Remove all articles
     */
    function removeAllProducts() {
        products = {};
        updateCounter();
        localStorage.removeItem('cart');
        return this;
    }

    function updateCounter() {
        var count = length();
        count > 0 ? $('.shopping-cart .count').html(count).show() : $('.shopping-cart .count').hide();
    }

    function createCommand(firstname, lastname) {
        var commands = localStorage.getItem('commands');
        if (commands) {
            commands = JSON.parse(commands);
            commands = { id: ++commands.id, firstname, lastname };
        } else {
            commands = { id: 1, firstname, lastname };
        }
        localStorage.setItem('commands', JSON.stringify(commands));
        removeAllProducts();
    }

    function getCommand() {
        var commands = localStorage.getItem('commands');
        return commands ? JSON.parse(commands) : {};
    }

    return { getProducts, setProduct, removeProduct, removeAllProducts, createCommand, length, getCommand }
})();

var View = (function(){

    function formatPrice(price) {
        return price.toFixed(2).toString().replace('.', ',');
    }

    return { formatPrice }
})();
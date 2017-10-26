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
    function get() {
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
    function set(number, article) {
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
    function remove(article) {
        delete products[article]; // Remove article
        updateCounter();
        localStorage.setItem('cart', JSON.stringify(products)); // Save
        return this;
    }
        
    /**
     * Remove all articles
     */
    function removeAll() {
        products = {};
        updateCounter();
        localStorage.removeItem('cart');
        return this;
    }

    function updateCounter() {
        var count = length();
        count > 0 ? $('.shopping-cart .count').html(count).show() : $('.shopping-cart .count').hide();
    }

    return { get, set, remove, removeAll, length }
})();

var View = (function(){

    function formatPrice(price) {
        return price.toFixed(2).toString().replace('.', ',');
    }

    return { formatPrice }
})();
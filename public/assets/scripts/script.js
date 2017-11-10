"use strict";

const Cart = (function(){

    /**
     * Constructor, called on `new Cart()`
     * @return {Cart}
     */
    function Cart() {
        // Products will be an object like
        // { idArticle : howMuch, ... }
        const cart = localStorage.getItem('cart');
        this.products = cart ? JSON.parse(cart) : {};
        if(Object.keys(this.products).length) {
            this.length = Object.values(this.products).reduce((p1, p2) => p1 + p2, 0);
        } else {
            this.length = 0;
        }
        this.updateCounter();
        return this;
    }

    /**
     * Add or remove specific article, x time
     * @param {int} number 
     * @param {int} article
     * @return {Cart}
     */
    Cart.prototype.setProduct = function(number, article) {
        number = parseInt(number);
        this.products[article] = this.products[article] ? this.products[article] + number : number;
        this.length += number;
        this.updateCounter();
        localStorage.setItem('cart', JSON.stringify(this.products));
        return this;
    }
    
    /**
     * Remove all specific article
     * @param {int} article 
     * @return boolean
     */
    Cart.prototype.removeProduct = function(article) {
        if(this.products[article]) {
            this.length -= this.products[article];
            this.updateCounter();
            delete this.products[article];
            localStorage.setItem('cart', JSON.stringify(this.products)); // Save
            return true;
        } else {
            return false;
        }
    }
        
    /**
     * Remove all articles
     * @return void
     */
    Cart.prototype.removeAllProducts = function() {
        this.length = 0;
        this.products = {};
        this.updateCounter();
        localStorage.removeItem('cart');
    }
    
    /**
     * Create command with all products and remove them from cart
     * @param firstname Shopper firstname
     * @param lastname Shopper lastname
     * @return void
     */
    Cart.prototype.createCommand = function(firstname, lastname) {
        var commands = localStorage.getItem('commands');
        if (commands) {
            commands = JSON.parse(commands);
            commands = { id: ++commands.id, firstname, lastname };
        } else {
            commands = { id: 1, firstname, lastname };
        }
        localStorage.setItem('commands', JSON.stringify(commands));
        this.removeAllProducts();
    }
    
    /**
     * Get the last command created
     * @return {Object} last command
     */
    Cart.prototype.getLastCommand = function() {
        let commands = localStorage.getItem('commands');
        return commands ? JSON.parse(commands) : {};
    }
    
    /**
     * Update top right corner product counter with products length
     * @return void
     */
    Cart.prototype.updateCounter = function() {
        this.length > 0 ?
            $('.shopping-cart .count').html(this.length).show()
            : $('.shopping-cart .count').hide();
    }

    return Cart;
})();

/**
 * Initialize Cart on all pages to update menu counter
 */
const cart = new Cart;

function formatPrice(price) {
    return price.toFixed(2).toString().replace('.', ',');
}
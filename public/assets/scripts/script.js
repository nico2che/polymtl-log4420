"use strict";

const Api = (function(){
    
    /**
     * Constructor, called on `new Api()`
     * @return {Api}
     */
    function Api(baseUrl = '/') {
        this.options = {
            baseUrl,
            contentType: 'application/json',
            dataType: 'JSON',
            error: error => console.error(error)
        };
        return this;
    }
    
    Api.prototype.request = function(method, url, data, error = this.options.error) {
        return $.ajax({
            ...this.options,
            url: this.options.baseUrl + url,
            type: method,
            data: method !== 'get' ? JSON.stringify(data) : null,
            error
        });
    }

    return Api;

})();

const Cart = (function(Api){

    /**
     * Constructor, called on `new Cart()`
     * @return {Cart}
     */
    function Cart() {
        // Products will be an object like
        // { idArticle : howMuch, ... }
        Api.request('get', '/shopping-cart', null)
            .done(products => {
                this.products = products;
                if(this.products.length) {
                    this.length = this.products.reduce((acc, p) => acc + p.quantity, 0);
                } else {
                    this.length = 0;
                }
                this.updateCounter();
            })
        return this;
    }
    
    /**
     * Get quantity from a product
     * @param {int} productId
     * @return {int}
     */
    Cart.prototype.countProduct = function(productId) {
        const [ product ] = this.products.filter(p => productId === p.productId);
        console.log(product)
        return product ? product.quantity : 0;
    }

    /**
     * Add or remove specific article, x time, and return new quantity
     * @param {int} quantity 
     * @param {int} productId
     * @return {int}
     */
    Cart.prototype.setProduct = function(quantity, productId) {
        Api.request('post', '/shopping-cart', { productId, quantity })
            .done(products => {
                this.products = products;
                this.length += parseInt(quantity);
                this.updateCounter();
                return this.countProduct(productId);
            });
    }
    
    /**
     * Remove all specific article
     * @param {int} productId 
     * @return boolean
     */
    Cart.prototype.removeProduct = function(productId) {
        Api.request('delete', '/shopping-cart/' + productId)
            .done(() => {
                const [product] = this.products.filter(p => p.productId === productId);
                console.log(product)
                if(product) {
                    this.length -= product.quantity;
                    this.updateCounter();
                    this.products = this.products.filter(p => p.productId !== productId);
                    return true;
                } else {
                    return false;
                }
            });
    }
        
    /**
     * Remove all articles
     * @return void
     */
    Cart.prototype.removeAllProducts = function() {
        Api.request('delete', '/shopping-cart')
            .done(() => {
                this.length = 0;
                this.products = [];
                this.updateCounter();
            })
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

    //selected tab
    var url = window.location.pathname;
    $("nav a").each(function(index) {
        $(this).removeClass('active');
        if(url === ($(this).attr('href')) && url != '/panier'){
            $(this).addClass('active');
        }

        console.log( index + ": " + $(this).text());
      });



    return Cart;

})(new Api('/api'));

/**
 * Initialize Cart on all pages to update menu counter
 */
const cart = new Cart;

function formatPrice(price) {
    return price.toFixed(2).toString().replace('.', ',');
}
"use strict";

var Product = (function(Cart){

    var article = null;

    function init() {
        // Get id from URL
        var id = /id=(\d+)$/.exec(window.location.search);
        if(id && id[1]) { // Check if id exists
            $.get('/api/products/' + id[1], data => {
                article = data;
                displayProduct();
            }, 'JSON')
                .fail(() => {
                    productNotFound();
                })
        } else {
            productNotFound();
        }
    }

    function productNotFound() {
        $('#product-name').html('Page non trouvée!');
        $('#product > div').remove();
    }

    function displayProduct() {
        $('#product-name').html(article.name); // Update name
        // Update image
        $('#product-image').attr({
            'src' : 'assets/img/' + article.image,
            'alt' : article.name,
        });
        $('#product-desc').html(article.description); // Update description
        // Update features
        var features = $('#product-features');
        article.features.map(function(feature){
            features.append($('<li>').html(feature));
        });
        // Update price
        $('#product-price').html(formatPrice(article.price));
        // Add article to basket event
        $('#add-to-cart-form').on('submit', submitForm);
    }

    function submitForm() {
        $('#dialog').addClass('show'); // Show confirmation dialog
        setTimeout(function(){ // Hide confirmation dialog after 5sec
            $('#dialog').removeClass('show');
        }, 5000);
        var numberArticles = $('#add-to-cart-form input').val(); // Increment basket count
        Cart.setProduct(numberArticles, article.id);
        return false; // Prevent submitted form
    }

    return { init }

})(cart);

Product.init();

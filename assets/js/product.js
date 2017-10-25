"use strict";

function product() {
    // Get id from URL
    var id = /id=(\d+)$/.exec(window.location.search);
    // Check if id exists
    if(id && id[1]) {
        // Find all products
        $.get('data/products.json', function(articles) {
            // Find article selected in loaded articles
            var index = articles.findIndex(function(article){ return article.id == id[1] });
            var article = articles[index];
            // Check if article exists
            if(article) {
                // Update name
                $('#product-name').html(article.name);
                // Update image
                $('#product-image').attr({
                    'src' : 'assets/img/' + article.image,
                    'alt' : article.name,
                });
                // Update description
                $('#product-desc').html(article.description);
                // Update features
                var features = $('#product-features');
                article.features.map(function(feature){
                    features.append($('<li>').html(feature));
                });
                // Update price
                $('#product-price').html(article.price.toFixed(2).replace(".", ","));
                // Add article to basket event
                $('#add-to-cart-form').on('submit', function(){
                    // Show confirmation dialog
                    $('#dialog').addClass('show');
                    // Hide confirmation dialog after 5sec
                    setTimeout(function(){
                        $('#dialog').removeClass('show');
                    }, 5000);
                    // Increment basket count
                    var numberArticles = $('#add-to-cart-form input').val();
                    updateCart(numberArticles, article.id);
                    return false;
                });
            } else {
                productNotFound();
            }
        }, 'JSON');
    } else {
        productNotFound();
    }
}

function productNotFound() {
    console.log('Invalid product');
    $('#product-name').html('Page non trouvée!');
    $('#product > div').remove();
}
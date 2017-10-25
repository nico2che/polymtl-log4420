"use strict";

(function(){
    var page = /\/(.+).html/.exec(window.location.pathname);
    page = page[1] ? page[1].replace('-', '') : "index";
    if(window[page])
        window[page]();
    updateCart();
})()

function index() {
    console.log('index')
}

function products() {
    
    // Default values about products page
    var criteria = 'price',
        orderBy = 'asc',
        articles = null,
        category = '';

    // Get all products
    $.get('data/products.json', function(data) {
         // Sort received data with custom function
        articles = data.sort(function(p1, p2) {
            return orderBy === 'asc' ? p1[criteria] - p2[criteria] : p2[criteria] - p1[criteria];
        });
        $.each(articles, function(i, article) { // For each article
            // Append it in flex list
            var article = $('<a>').attr({
                'data-category': article.category,
                'data-name': article.name,
                'data-price': article.price,
                'href': 'product.html?id=' + article.id,
            }).append('<article>' +
                            '<h2>' + article.name + '</h2>' +
                            '<img src="assets/img/' + article.image + '" />' + 
                            '<p>Prix ' + article.price + ' $</p>' +
                        '</article>');
            $('#products-list > div').append(article);
        });
        $('#products-list > p').html(articles.length + ' produits');
    }, 'JSON');

    // Category buttons event
    $('#product-categories > button').on('click', function(){
        // Change selected style
        $('#product-categories > button.selected').removeClass('selected');
        $(this).addClass('selected');
        // Update new category
        category = $(this).data('category');
        var c = 0;
        $('#products-list a').css({
            'display' : 'none' // Hide all articles
        }).filter(function(i, article) {
            // Filter article with selected category
            return (category === "" || $(article).data('category') === category) && ++c;
        }).css({ 'display' : 'block' }) // And display them
        // Update article counter
        $('#products-count').html(c + ' produits');
    });

    // Criteria buttons event
    $('#product-criteria > button').on('click', function(){
        // Change selected style
        $('#product-criteria > button.selected').removeClass('selected');
        $(this).addClass('selected');
        // Update new criteria and order
        criteria = $(this).data('criteria');
        orderBy = $(this).data('order');
        // Apply them
        $('#products-list a').sort(function(p1, p2) {
            // Sort conditions
            if(orderBy === 'asc')
                return $(p1).data(criteria) > $(p2).data(criteria) ? 1 : -1;
            else
                return $(p1).data(criteria) < $(p2).data(criteria) ? 1 : -1;
        }).each(function(){
            // Reorder articles
            $('#products-list > div').append($(this))
        })
    });
}

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
                    updateCart(numberArticles);
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

function updateCart(value) {
    value = parseInt(value);
    var cart = localStorage.getItem('cart');
    cart = cart ? parseInt(cart) : 0;
    if (value > 0) {
        cart += value;
        localStorage.setItem('cart', cart);
    } else if (value === 0) {
        cart = 0;
        localStorage.setItem('cart', 0);
    }
    if(cart > 0)
        $('.shopping-cart .count').html(cart).show();
    else
        $('.shopping-cart .count').hide();
}

function order() {
    console.log('order')
}

function shoppingcart() {
    console.log('shoppingcart')
}
"use strict";

(function(){
    var page = /\/(.+).html/.exec(window.location.pathname);
    page = page[1] ? page[1].replace('-', '') : "index";
    if(window[page])
        window[page]();
})()

function index() {
    console.log('index')
}

function products() {
    
    // Default values about products page
    var criteria = 'price',
        orderBy = 'asc',
        articles = null,
        category = 'cameras';

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
                'href': 'product.html?id=' + article.category,
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
    console.log('product')
}

function order() {
    console.log('order')
}

function shoppingcart() {
    console.log('shoppingcart')
}
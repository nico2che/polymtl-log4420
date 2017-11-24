"use strict";

var Products = (function(){

    var criteria = 'price',
        orderBy = 'asc',
        articles = null,
        category = '';

    function init() {
        // Get all products
        getArticles();
        $('#product-categories > button').on('click', sortCategory); // Category buttons event
        $('#product-criteria > button').on('click', sortCriteria); // Criteria buttons event
    }

    function sortCategory() {
        // Change selected style
        $('#product-categories > button.selected').removeClass('selected');
        $(this).addClass('selected');
        // Update new category
        category = $(this).data('category');
        // Apply it
        getArticles();
    }

    function sortCriteria() {
        // Change selected style
        $('#product-criteria > button.selected').removeClass('selected');
        $(this).addClass('selected');
        // Update new criteria and order
        criteria = $(this).data('criteria');
        orderBy = $(this).data('order');
        // Apply them
        getArticles();
    }

    function getArticles() {
        $.ajax({
            url: '/api/products',
            type: 'GET',
            dataType: 'JSON',
            data: { criteria, orderBy, category }
        }).done(articles => displayProducts(articles));
    }

    function displayProducts(articles) {
        $('#products-list').empty();
        articles.map(function(article){ // For each article
            // Append it in flex list
            var article = $('<a>').attr({
                'data-category': article.category,
                'data-name': article.name.toLowerCase(),
                'data-price': article.price,
                'href': 'produit?id=' + article.id,
            }).append('<article>' +
                            '<h2>' + article.name + '</h2>' +
                            '<img src="assets/img/' + article.image + '" />' +
                            '<p>Prix ' + formatPrice(article.price) + ' $</p>' +
                        '</article>');
            $('#products-list').append(article);
        });
        $('#products-count').html(articles.length + ' produits');
    }

    return { init }

})(cart);

Products.init();

"use strict";

var Products = (function(){

    var criteria = 'price',
        orderBy = 'asc',
        articles = null,
        category = '';

    function init() {
        // Get all products
        $.get('data/products.json', function(data) {
             // Sort received data with custom function
            articles = data.sort(function(p1, p2) {
                return orderBy === 'asc' ? p1[criteria] - p2[criteria] : p2[criteria] - p1[criteria];
            });
            displayProducts(articles);
            $('#products-count').html(articles.length + ' produits');
        }, 'JSON');     
        $('#product-categories > button').on('click', sortCategory); // Category buttons event
        $('#product-criteria > button').on('click', sortCriteria); // Criteria buttons event
    }
    
    function sortCategory() {
        // Change selected style
        $('#product-categories > button.selected').removeClass('selected');
        $(this).addClass('selected');
        // Update new category
        category = $(this).data('category');
        // Get articles
        var articleSorted = articles.filter(function(article){
            return category === '' || article.category === category;
        });
        displayProducts(articleSorted);
    }
    
    function sortCriteria() {
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
            $('#products-list').append($(this))
        })
    }

    function displayProducts(articles) {
        $('#products-list').empty();
        articles.map(function(article){ // For each article
            // Append it in flex list
            var article = $('<a>').attr({
                'data-category': article.category,
                'data-name': article.name.toLowerCase(),
                'data-price': article.price,
                'href': 'product.html?id=' + article.id,
            }).append('<article>' +
                            '<h2>' + article.name + '</h2>' +
                            '<img src="assets/img/' + article.image + '" />' + 
                            '<p>Prix ' + article.price.toString().replace('.', ',') + ' $</p>' +
                        '</article>');
            $('#products-list').append(article);
        });
        $('#products-count').html(articles.length + ' produits');       
    }

    return { init }

})(Storage.get());

Products.init();
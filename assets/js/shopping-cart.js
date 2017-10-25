"use strict";

function shoppingcart() {
    var cart = localStorage.getItem('cart');
    if(cart) {
        cart = JSON.parse(cart);
        $.get('data/products.json', function(articles) {
            articles.filter(function(article){
                return cart[article.id];
            }).sort(function(p1, p2){
                return p1.name.toLowerCase() > p2.name.toLowerCase() ? 1 : -1;
            }).map(function(article) {
                var row = '<tr data-price="' + article.price + '" data-id="' + article.id + '">' +
                            '<td><button class="remove-item-button"><i class="fa fa-remove"></i></button></td>' +
                            '<td><a href="product.html?id=' + article.id + '">' + article.name + '</a></td>' +
                            '<td>' + article.price + ' $</td>' +
                            '<td>' +
                                '<button class="remove-quantity-button"' + (cart[article.id] < 2 ? ' disabled=""' : '') +
                                '><i class="fa fa-minus"></i></button> ' +
                                '<span class="quantity">' + cart[article.id] + '</span> ' +
                                '<button class="add-quantity-button"><i class="fa fa-plus"></i></button>' +
                            '</td>' +
                            '<td class="price">' + (article.price * cart[article.id]) + '$</td>' +
                        '</tr>';
                $('tbody').append(row);
            });

            $('button.remove-quantity-button, button.add-quantity-button').on('click', function(){
                // Get id
                var row = $(this).parent().parent();
                var id = row.data('id');
                var incrementer = $(this).hasClass('remove-quantity-button') ? -1 : 1;
                // Update menu cart and storage
                updateCart(incrementer, id);
                // Update table
                cart[id] += incrementer;
                if(cart[id] < 2) {
                    $(this).attr('disabled', 'disabled');
                } else {
                    row.find('.remove-quantity-button').removeAttr('disabled');
                }
                row.find('.quantity').html(cart[id]);
                row.find('.price').html(parseFloat(row.data('price') * cart[id] + '$'));
            });

            $('.remove-item-button').on('click', function(){
                if(confirm('Voulez-vous supprimer le produit du panier ?')) {
                    var row = $(this).parent().parent();
                    var id = row.data('id');
                    // Update menu cart and storage
                    updateCart(0, id);
                    // Update table
                    row.remove();
                }
            });
            
            $('.remove-all-items-button').on('click', function(){
                if(confirm('Voulez-vous supprimer tous les produits du panier ?')) {
                    // Remove all products from storage
                    localStorage.removeItem('cart');
                    // Update menu cart
                    updateCart();
                    // Update table
                    $('tbody tr').remove();
                }
            });
        }, 'JSON');
    }
}

function updateTotal() {
    //$('#total-amount')
}
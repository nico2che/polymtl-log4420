"use strict";

var ShoppingCart = ((Cart) => {

    function init() {
        Cart.init().then(() => {
            if (Cart.length === 0) {
                hideTable();
            } else {
                loadTable();
            }
        })
    }

    function loadTable() {
        $.get('/api/products', products => {
            products.filter(article => { // Filter only our articles
                return Cart.countProduct(article.id);
            }).sort((p1, p2) => { // Sort them alpha A-Z
                return p1.name.toLowerCase() > p2.name.toLowerCase() ? 1 : -1;
            }).map(article => { // And display
                const count = Cart.countProduct(article.id);
                addProduct(article, count);
            });
            updateTotal(); // Update total amount
            // Buttons events
            $('button.remove-quantity-button, button.add-quantity-button').on('click', changeQuantity);
            $('.remove-item-button').on('click', removeProduct);
            $('#remove-all-items-button').on('click', removeAllProducts);
        }, 'JSON');
    }

    function addProduct(article, count) {
        var row = '<tr data-price="' + article.price + '" data-id="' + article.id + '">' +
                        '<td><button class="remove-item-button"><i class="fa fa-remove"></i></button></td>' +
                        '<td><a href="/produit?id=' + article.id + '">' + article.name + '</a></td>' +
                        '<td>' + formatPrice(article.price) + ' $</td>' +
                        '<td>' +
                            '<button class="remove-quantity-button"' + (count < 2 ? ' disabled=""' : '') +
                            '><i class="fa fa-minus"></i></button> ' +
                            '<span class="quantity">' + count + '</span> ' +
                            '<button class="add-quantity-button"><i class="fa fa-plus"></i></button>' +
                        '</td>' +
                        '<td class="price">' + formatPrice(article.price * count) + ' $</td>' +
                    '</tr>';
        $('tbody').append(row);
    }

    function changeQuantity() {
        var row = $(this).parent().parent();
        var id = row.data('id'); // Get article id
        var incrementer = $(this).hasClass('remove-quantity-button') ? -1 : 1;
        Cart.setProduct(incrementer, id); // Update storage
        var newQuantity = parseInt(row.find('.quantity').html()) + incrementer;
        // Disable/Active button if necessary
        if(newQuantity < 2) {
            $(this).attr('disabled', 'disabled');
        } else {
            row.find('.remove-quantity-button').removeAttr('disabled');
        }
        // Update quantity & price
        row.find('.quantity').html(newQuantity);
        row.find('.price').html(formatPrice(parseFloat(row.data('price')) * newQuantity) + ' $');
        updateTotal(); // Update total amount
    }

    function removeProduct() {
        if(confirm('Voulez-vous supprimer le produit du panier ?')) {
            var row = $(this).parent().parent();
            var id = row.data('id');
            Cart.removeProduct(id); // Update menu cart and storage
            row.remove(); // Update table
            updateTotal(); // Update total amount
        }
    }

    function removeAllProducts() {
        if(confirm('Voulez-vous supprimer tous les produits du panier ?')) {
            Cart.removeAllProducts();
            hideTable();
        }
    } 
    
    function updateTotal() {
        var totalAmount = 0;
        $('tbody tr').each(function(){
            var price = parseFloat($(this).data('price'));
            totalAmount += price * parseFloat($(this).find('.quantity').html());
        });
        $('#total-amount').html(formatPrice(totalAmount));
        if (totalAmount === 0)
            hideTable();
    }

    function hideTable() {
        $('table').remove();
        $('#shopping-cart p').html('Aucun produit dans le panier.');
    }

    return { init }

})(cart);

ShoppingCart.init();
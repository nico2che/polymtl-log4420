"use strict";

(function(){
    var page = /\/(.+).html/.exec(window.location.pathname);
    page = page[1] ? page[1].replace('-', '') : "index";
    if(window[page])
        window[page]();
    updateCart();
})();

function updateCart(number, article) {
    // Get cart items
    var cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : {};
    // Concat with new items
    if(article && number)
        cart[article] = cart[article] ? cart[article] + parseInt(number) : parseInt(number);
    else if (article && number === 0)
        delete cart[article];
    // Store new data
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update menu cart
    var count = Object.keys(cart).length ? Object.values(cart).reduce((p1, p2) => p1 + p2) : 0;
    if(count > 0)
        $('.shopping-cart .count').html(count).show();
    else
        $('.shopping-cart .count').hide();
}
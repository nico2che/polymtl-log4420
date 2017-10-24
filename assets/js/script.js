//
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
    console.log('products')
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
"use strict";

var Confirmation = (function(Cart){

    function init() {
        var command = Cart.getLastCommand();
        if (command.id) {
            $('#name').html(command.firstname + ' ' + command.lastname);
            $('#confirmation-number').html(command.id)
        } else {
            $('h1').html('Aucune commande passée');
            $('p').remove();
        }
    }

    return { init }

})(cart);

Confirmation.init();
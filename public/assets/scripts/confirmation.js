"use strict";

var Confirmation = (function(Cart){

    function init() {
        Cart.getCommands()
            .done((commands) => {
                const [command] = commands.slice(-1);
                if (command.id) {
                    $('#name').html(command.firstName + ' ' + command.lastName);
                    $('#confirmation-number').html(command.id)
                } else {
                    $('h1').html('Aucune commande passée');
                    $('p').remove();
                }
            })
    }

    return { init }

})(cart);

Confirmation.init();
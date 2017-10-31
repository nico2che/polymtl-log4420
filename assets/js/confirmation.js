"use strict";

var Confirmation = (function(command){

    function init() {
        if (command.id) {
            $('#name').html(command.firstname + ' ' + command.lastname);
            $('#confirmation-number').html(command.id)
        } else {
            $('h1').html('Aucune commande passée');
            $('p').remove();
        }
    }

    return { init }

})(Storage.getCommand());

Confirmation.init();
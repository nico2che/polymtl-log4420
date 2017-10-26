"use strict";

var Confirmation = (function(commands){

    function init() {
        var id = /confirmation=(\d+)$/.exec(window.location.search);
        if (id && id[1]) {
            var command = commands[id[1]];
            $('#name').html(command.firstname + ' ' + command.lastname);
            $('#confirmation-number').html(command.id)
        }
    }

    return { init }

})(Storage.getCommands());

Confirmation.init();
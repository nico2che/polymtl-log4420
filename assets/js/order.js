"use strict";

var Order = (function(){

    function init() {
        validationAddMethods();
        validateForm();
    }

    function validateForm() {
        $('#order-form').validate({
            rules: {
                'phone': {
                    required: true,
                    phoneUS: true
                },
                'credit-card': {
                    required: true,
                    creditcard: true
                },
                'credit-card-expiry' : {
                    required: true,
                    creditcarddate: true
                }
            },
            submitHandler: onSubmit
        });
    }

    function onSubmit() {
        var firstname = $('#first-name').val(),
            lastname = $('#last-name').val();
        Storage.createCommand(firstname, lastname);
        window.location = 'confirmation.html';
    }
    
    function validationAddMethods() {
        $.validator.addMethod('creditcarddate', function(value, element, params) {
                    var date = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value);
                    if(date && date[1] && date[2]) {
                        var minMonth = new Date().getMonth() + 1;
                        var minYear = new Date().getFullYear();
                        var month = parseInt(date[1]);
                        var year = parseInt("20" + date[2]);
                        return (year > minYear) || ((year === minYear) && (month >= minMonth));
                    }
                }
            , 'La date d\'expiration de votre carte de crédit est invalide.');
    }

    return { init }

})(Storage.getProducts());

Order.init();
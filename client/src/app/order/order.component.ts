import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from "../orders.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { Router } from "@angular/router";
declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: any;
  order: Order = new Order();

  /**
   * Initializes a new instance of the OrderComponent class.
   *
   * @param router                Router Angular Module
   * @param shoppingCartService   ShoppingCart API Service Injected
   * @param orderService          Order API Service Injected
   */
  constructor(private router: Router,
              private shoppingCartService: ShoppingCartService,
              private orderService: OrdersService) {}

  /**
   * Occurs when the component is initialized.
   * Protect the form, and prepare Order information with new id and current cart
   */
  async ngOnInit() {
    // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });
    // Get all orders
    const orders: Order[] = await this.orderService.getOrders();
    // Get last order ++id, otherwise 1 to start
    this.order.id = orders.length ? ++orders[orders.length - 1].id : 1;
    // Get all current items in shopping cart
    const items = await this.shoppingCartService.getItems();
    // Redefine items to send them to the server
    this.order.products = items.map(({ productId: id, quantity }) => ({ id, quantity }));
  }

  /**
   * Submits the order form.
   * Create new order if form is valid and redirect to the confirmation page
   */
  async submit() {
    if (!this.orderForm.valid()) {
      return;
    }
    // OK, form was valid, send order to create it
    await this.orderService.createOrder(this.order);
    // Wait and go to confirmation page
    this.router.navigate(['/confirmation']);
  }
}

import { Component } from '@angular/core';
import { Order, OrdersService } from "../orders.service";

/**
* Defines the component responsible to manage the confirmation page.
*/
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {

  /**
   * Initializes a new instance of the ConfirmationComponent class.
   *
   * @param orderService   Orders API Service Injected
   */
  constructor(private orderService: OrdersService) {}

  // Contain all information about current order
  order: Order;

  /**
   * Retrieve all orders and get information from the last one
   *
   * @returns {Promise<void>}
   */
  async ngOnInit() {
    const orders: Order[] = await this.orderService.getOrders();
    this.order = orders.length ? orders[orders.length - 1] : undefined;
  }
}

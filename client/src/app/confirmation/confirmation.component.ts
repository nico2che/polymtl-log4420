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

  constructor(private orderService: OrdersService) {}

  order: Order;

  async ngOnInit() {
    const orders: Order[] = await this.orderService.getOrders();
    this.order = orders.length ? orders[orders.length - 1] : undefined;
  }
}

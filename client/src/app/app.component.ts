import { Component } from '@angular/core';
import { ProductsService, Product } from "./products.service";
import { ShoppingCartService, ShoppingCart } from "./shopping-cart.service";

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  readonly authors = [
    'Nicolas de Chevigné',
    'Pierre Terroitin'
  ];

  constructor(private shoppingCartService: ShoppingCartService) {
    this.counter = shoppingCartService;
  }

  counter;

  async ngOnInit() {
    await this.shoppingCartService.getItems();
  }

}

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

  constructor(private shoppingCartService: ShoppingCartService) {}

  readonly authors = [
    'Nicolas de Chevigné',
    'Pierre Terroitin'
  ];

  shoppingCart: ShoppingCart[];

  ngOnInit() {
    this.shoppingCartService
      .getShoppingCart()
      .then(products => this.shoppingCart = products);
  }

}

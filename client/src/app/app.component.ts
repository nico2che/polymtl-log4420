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

  // Author in footer's app.component.html
  readonly authors = [
    'Nicolas de Chevigné',
    'Pierre Terroitin'
  ];

  /**
   * Initializes a new instance of the AppComponent class.
   *
   * @param shoppingCartService   ShoppingCart API Service Injected
   */
  constructor(private shoppingCartService: ShoppingCartService) {}

  /**
   * Bind counter variable with Shopping Cart Service which contains all items
   * added by the user, it will update the menu products counter for each updates
   *
   * @type {ShoppingCartService}
   */
  counter: ShoppingCartService = this.shoppingCartService;

  /**
   * Get all items previously added by the user from the server and store them
   * in the ShoppingCartService service
   *
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    await this.shoppingCartService.getItems();
  }

}

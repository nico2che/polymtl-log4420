import { Component } from '@angular/core';
import { ShoppingCart, ShoppingCartService } from "../shopping-cart.service";
import { Product, ProductsService } from "../products.service";

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent {

  /**
   * Initializes a new instance of the ShoppingCartComponent class.
   *
   * @param shoppingCartService   ShoppingCart API Service Injected
   * @param productService        Products API Service Injected
   */
  constructor(private shoppingCartService: ShoppingCartService,
              private productService: ProductsService) {}

  items: ShoppingCart[] = []; // Items added in cart
  products: Product[] = []; // Products information for each items added
  totalAmount:number = 0; // Total price amount under the table

  /**
   * Update totalAmount local variable with all price * quantity for each
   * added products
   */
  updateTotalAmount(): void {
    this.totalAmount = this.items.reduce((i, p) => i + this.products[p.productId].price * p.quantity, 0);
  }

  /**
   * Update quantity number for a product from the server and locally
   *
   * @param {number} productId              Product ID to update
   * @param {number} quantity               New quantity
   * @returns {Promise<void>}
   */
  async updateQuantity(productId: number, quantity: number): Promise<void> {
    await this.shoppingCartService.updateItem(productId, quantity);
    this.updateTotalAmount();
  }

  /**
   * Delete an item from the cart, on the server and locally
   *
   * @param {Product} product
   * @returns {Promise<void>}
   */
  async deleteItem(product: Product): Promise<void> {
    if(confirm(`Voulez-vous vraiment supprimer ${product.name} ?`)) {
      await this.shoppingCartService.deleteItem(product);
      this.items = this.items.filter(item => item.productId !== product.id);
      this.updateTotalAmount();
    }
  }

  /**
   * Delete all items from the cart, on the server and locally
   *
   * @returns {Promise<void>}
   */
  async emptyCart(): Promise<void> {
    if(confirm(`Voulez-vous vraiment vider le panier ?`)) {
      await this.shoppingCartService.deleteAllItem();
      this.items = [];
      this.totalAmount = 0;
    }
  }

  /**
   * At start, retrieved all items from server, product information from each item
   * and update totalAmount local variable
   *
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    this.items = await this.shoppingCartService.getItems();
    this.items.map(async item => {
      const product = await this.productService.getProduct(item.productId);
      this.products[product.id] = product;
      this.totalAmount += product.price * item.quantity;
    });
  }

}

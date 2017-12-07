import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, Product } from "../products.service";
import { ShoppingCart, ShoppingCartService } from "../shopping-cart.service";

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   * @param productService          Products API Service Injected
   * @param shoppingCartService     ShoppingCart API Service Injected
   */
  constructor(private route: ActivatedRoute,
              private productService: ProductsService,
              private shoppingCartService: ShoppingCartService) { }

  // Information about current product
  product: Product;
  // Quantity to add in cart
  quantity: number;
  // "Product Added" Dialog confirmation status
  dialog: boolean = false;

  /**
   * Get information about a product
   *
   * @param {number} id             The product's ID where to get information
   * @returns {Promise<void>}
   */
  async getProduct(id: number): Promise<void> {
    this.product = await this.productService.getProduct(id);
  }

  /**
   * Add item in cart
   *
   * @returns {Promise<void>}
   */
  async addItem(): Promise<void> {
    // Appears the dialog confirmation
    this.dialog = true;
    // Check if product already exist
    const exists = this.shoppingCartService.items.filter(p => p.productId === this.product.id).length;
    if (!exists) { // If doesn't, create a new one
      await this.shoppingCartService.addItem(this.product.id, this.quantity);
    } else { // If it does, update it
      await this.shoppingCartService.updateItem(this.product.id, this.quantity);
    }
    // Wait 5 seconds
    await new Promise(r => setTimeout(r, 5000));
    // And hide the confirmation dialog
    this.dialog = false;
  }

  /**
   * Occurs when the component is initialized.
   * Get ID from the route, get product information with this ID and set default
   * quantity to add at 1.
   */
  async ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    await this.getProduct(parseInt(productId));
    this.quantity = 1;
  }
}

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
   */
  constructor(private route: ActivatedRoute,
              private productService: ProductsService,
              private shoppingCartService: ShoppingCartService) { }

  product: Product;
  quantity: number;
  dialog: boolean = false;

  async getProduct(id: number) {
    this.product = await this.productService.getProduct(id);
  }

  async addItem() {
    this.dialog = true;
    const exists = this.shoppingCartService.items.filter(p => p.productId === this.product.id).length;
    if (!exists) {
      await this.shoppingCartService.addItem(this.product.id, this.quantity);
    } else {
      await this.shoppingCartService.updateItem(this.product.id, this.quantity);
    }
    await new Promise(r => setTimeout(r, 5000));
    this.dialog = false;
  }

  /**
   * Occurs when the component is initialized.
   */
  async ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    await this.getProduct(parseInt(productId));
    this.quantity = 1;
  }
}

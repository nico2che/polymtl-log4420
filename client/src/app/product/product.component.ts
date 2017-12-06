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

  getProduct(id: number): void {
    this.productService
      .getProduct(id)
      .then(product => this.product = product);
  }

  addItem() {
    const exists = this.shoppingCartService.items.filter(p => p.productId === this.product.id).length;
    if (!exists) {
      this.shoppingCartService.addItem(this.product.id, this.quantity);
    } else {
      this.shoppingCartService.updateItem(this.product.id, this.quantity);
    }
  }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(parseInt(productId));
    this.quantity = 1;
  }
}

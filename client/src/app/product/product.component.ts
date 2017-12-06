import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, Product } from "../products.service";

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
  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  product: Product;

  getProduct(id: number): void {
    this.productService
      .getProduct(id)
      .then(product => this.product = product);
  }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(parseInt(productId));
    // TODO: Compléter la logique pour afficher le produit associé à l'identifiant spécifié (productId).
  }
}

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

  // Service Injection
  constructor(private shoppingCartService: ShoppingCartService,
              private productService: ProductsService) {}

  items: ShoppingCart[] = [];
  products: Product[] = [];
  totalAmount:number = 0;

  updateTotalAmount() {
    this.totalAmount = this.items.reduce((i, p) => i + this.products[p.productId].price * p.quantity, 0);
  }

  async updateQuantity(productId: number, quantity: number) {
    await this.shoppingCartService.updateItem(productId, quantity);
    this.updateTotalAmount();
  }

  async deleteItem(product: Product) {
    if(confirm(`Voulez-vous vraiment supprimer ${product.name} ?`)) {
      await this.shoppingCartService.deleteItem(product);
      this.items = this.items.filter(item => item.productId !== product.id);
      this.updateTotalAmount();
    }
  }

  async emptyCart() {
    if(confirm(`Voulez-vous vraiment vider le panier ?`)) {
      await this.shoppingCartService.deleteAllItem();
      this.items = [];
      this.totalAmount = 0;
    }
  }

  async ngOnInit() {
    this.items = await this.shoppingCartService.getItems();
    this.items.map(async item => {
      const product = await this.productService.getProduct(item.productId);
      this.products[product.id] = product;
      this.totalAmount += product.price * item.quantity;
    });
  }

}

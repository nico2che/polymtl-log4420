import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from './config';
import {Product, ProductsService} from "./products.service";

/**
 * Defines a product.
 */
export class ShoppingCart  {
  productId: number;
  quantity: number;
}

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers, withCredentials: true });

/**
 * Defines the service responsible to create and retrieve the orders in the database.
 */
@Injectable()
export class ShoppingCartService {

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  /**
   * Initializes a new instance of the ShoppingCartService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: Http, private productService: ProductsService) {}

  items: ShoppingCart[];

  getCounter():number {
    return this.items ? this.items.reduce((i, p) => i + p.quantity, 0) : 0;
  }

  getItems(): Promise<ShoppingCart[]> {
    let url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.get(url, options)
      .toPromise()
      .then(products => this.items = products.json() as ShoppingCart[])
      .catch(ShoppingCartService.handleError);
  }

  addItem(productId: number, quantity: number): void {
    // Update local items
    this.items.push({ productId, quantity });
    // Update server
    let url = `${Config.apiUrl}/shopping-cart/`;
    this.http.post(url, JSON.stringify({
      productId,
      quantity
    }), options)
      .toPromise()
      .catch(ShoppingCartService.handleError);
  }

  updateItem(productId: number, quantity: number): void {
    // Update local quantity
    const i = this.items.findIndex(p => p.productId === productId);
    this.items[i].quantity += quantity;
    // Update server
    let url = `${Config.apiUrl}/shopping-cart/${productId}`;
    this.http.put(url, JSON.stringify({
      quantity: this.items[i].quantity
    }), options)
      .toPromise()
      .catch(ShoppingCartService.handleError);
  }

  deleteItem(product: Product): void {
    // Update local items
    this.items = this.items.filter(item => item.productId !== product.id);
    // Update server
    let url = `${Config.apiUrl}/shopping-cart/${product.id}`;
    this.http.delete(url, options)
      .toPromise()
      .catch(ShoppingCartService.handleError);
  }

  deleteAllItem(): void {
    // Update local items
    this.items = [];
    // Update server
    let url = `${Config.apiUrl}/shopping-cart/`;
    this.http.delete(url, options)
      .toPromise()
      .catch(ShoppingCartService.handleError);
  }

}

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from './config';
import { Product, ProductsService } from "./products.service";

/**
 * Defines a product.
 */
export class ShoppingCart  {
  productId: number;
  quantity: number;
}

// Required headers to each server requests
const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers, withCredentials: true });

/**
 * Defines the service responsible to create and retrieve the items in the database.
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
   * @param productService          Products API Service Injected
   */
  constructor(private http: Http,
              private productService: ProductsService) {}

  /**
   * All items in cart retrieved from the server will go there
   */
  items: ShoppingCart[];

  /**
   * Sum of quantities from each items added in the cart
   * @returns {number}
   */
  getCounter():number {
    return this.items ? this.items.reduce((i, p) => i + p.quantity, 0) : 0;
  }

  /**
   * Get all items added in current session from the server,
   * store them in local items and return them
   * @returns {Promise<ShoppingCart[]>}
   */
  getItems(): Promise<ShoppingCart[]> {
    let url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.get(url, options)
      .toPromise()
      .then(products => this.items = products.json() as ShoppingCart[])
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Add a new item in cart: send to the server product and quantity,
   * and update local items
   *
   * @param {number} productId        Product ID to add in cart
   * @param {number} quantity         Quantity of this product to add in cart
   * @returns {Promise<any>}
   */
  addItem(productId: number, quantity: number): Promise<any> {
    // Update local items
    this.items.push({ productId, quantity });
    // Update server
    let url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.post(url, JSON.stringify({
      productId,
      quantity
    }), options)
      .toPromise()
      .catch(ShoppingCartService.handleError);
  }

  /**
   * If an item already exists in cart, update its quantity on the server,
   * and locally
   * @param {number} productId          Product ID to update
   * @param {number} quantity           New quantity to store
   * @returns {Promise<any>}
   */
  updateItem(productId: number, quantity: number): Promise<any> {
    // Update local quantity
    const i = this.items.findIndex(p => p.productId === productId);
    this.items[i].quantity += quantity;
    // Update server
    let url = `${Config.apiUrl}/shopping-cart/${productId}`;
    return this.http.put(url, JSON.stringify({
      quantity: this.items[i].quantity
    }), options)
      .toPromise()
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Delete an item from the cart, update the server and local items
   * @param {Product} product
   */
  deleteItem(product: Product): void {
    // Update local items
    this.items = this.items.filter(item => item.productId !== product.id);
    // Update server
    let url = `${Config.apiUrl}/shopping-cart/${product.id}`;
    this.http.delete(url, options)
      .toPromise()
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Delete all items from the cart, update server and local items
   */
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

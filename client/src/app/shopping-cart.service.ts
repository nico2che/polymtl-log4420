import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config';
import { Product } from "./products.service";

/**
 * Defines a product.
 */
export class ShoppingCart  {
  id: number;
  productId: number;
  quantity: number;
}

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
  constructor(private http: Http) {}

  getShoppingCart(): Promise<ShoppingCart[]> {
    let url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.get(url)
      .toPromise()
      .then(products => products.json() as ShoppingCart[])
      .catch(ShoppingCartService.handleError);
  }

  addProduct(productId: number, quantity: number): Promise<any> {
    let url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.post(url, JSON.stringify({
      productId,
      quantity
    }))
      .toPromise()
      .catch(ShoppingCartService.handleError);
  }

}

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Config } from './config';
import { ShoppingCartService } from "./shopping-cart.service";

/**
 * Defines a product.
 */
export class Order  {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  products: object;
}

// Required headers to each server requests
const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers, withCredentials: true });

/**
 * Defines the service responsible to create and retrieve the orders in the database.
 */
@Injectable()
export class OrdersService {

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
   * Initializes a new instance of the OrdersService class.
   *
   * @param http                    The HTTP service to use.
   * @param shoppingCartService     ShoppingCart API Service Injected
   */
  constructor(private http: Http,
              private shoppingCartService: ShoppingCartService) {}

  /**
   * Get all orders from the server
   *
    * @returns {Promise<Order[]>}
   */
  getOrders(): Promise<Order[]> {
    let url = `${Config.apiUrl}/orders/`;
    return this.http.get(url, options)
      .toPromise()
      .then(orders => orders.json() as Order[])
      .catch(OrdersService.handleError);
  }

  /**
   * Create a new order on the server and delete all items from the cart
   *
   * @param {Order} order
   * @returns {Promise<any>}
   */
  createOrder(order: Order) {
    let url = `${Config.apiUrl}/orders/`;
    return this.http.post(url, JSON.stringify(order), options)
      .toPromise()
      .then(() => this.shoppingCartService.deleteAllItem())
      .catch(OrdersService.handleError);
  }

}

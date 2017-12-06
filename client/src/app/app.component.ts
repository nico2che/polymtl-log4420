import { Component } from '@angular/core';
import { Product } from "./products.service";

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  readonly authors = [
    'Nicolas de Chevigné',
    'Pierre Terroitin'
  ];

  cart: Product[];
}

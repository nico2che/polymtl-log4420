import { Component } from '@angular/core';
import { ProductsService, Product } from "../products.service";

const MENU_SORTING = [
  { action: 'price-asc', name: 'Prix (bas-haut)' },
  { action: 'price-dsc', name: 'Prix (haut-bas)' },
  { action: 'alpha-asc', name: 'Nom (A-Z)' },
  { action: 'alpha-dsc', name: 'Nom (Z-A)' },
];

const MENU_CATEGORY = [
  { action: 'cameras', name: 'Appareils photo' },
  { action: 'consoles', name: 'Consoles' },
  { action: 'screens', name: 'Écrans' },
  { action: 'computers', name: 'Ordinateurs' },
  { action: 'all', name: 'Tous les produits' },
];

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  providers: [ProductsService]
})
export class ProductsComponent {

  /**
   * Initializes a new instance of the ProductsComponent class.
   *
   * @param productService   Products API Service Injected
   */
  constructor(private productService: ProductsService) {}

  // List of products
  products: Product[];

  // Menus
  menuSorting = MENU_SORTING;
  menuCategory = MENU_CATEGORY;

  // Default products sorting
  sortingCriteria = 'price-asc';
  category = 'all';

  /**
   * Sort products by a criteria (price-asc, price-dsc, alpha-asc, alpha-dsc)
   * @param {string} sortingCriteria            The criteria to apply
   */
  setSorting(sortingCriteria: string) {
    this.sortingCriteria = sortingCriteria;
    this.getProducts();
  }

  /**
   * Filter products by a category
   * @param {string} category                   The category to apply
   */
  setCategory(category: string) {
    this.category = category;
    this.getProducts();
  }

  /**
   * Get all products from the server, with current criteria and category selection
   */
  getProducts(): void {
    this.productService
      .getProducts(this.sortingCriteria, this.category)
      .then(products => this.products = products);
  }

  /**
   * Get all products on start
   */
  ngOnInit(): void {
    this.getProducts();
  }
}

import { Component } from '@angular/core';
import { ProductsService, Product } from "../products.service";

const MENU_SORTING = [
  { action: 'price-asc', name: 'Prix (bas-haut)' },
  { action: 'price-dsc', name: 'Prix (haut-bas)' },
  { action: 'alpha-asc', name: 'Nom (A-Z)' },
  { action: 'alpha-dsc', name: 'Nom (Z-A)' },
];

const MENU_CATEGORY = [
  { action: 'cameras', name: 'Caméras' },
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

  // Service Injection
  constructor(private productService: ProductsService) {}

  // List of products
  products: Product[];

  // Menus
  menuSorting = MENU_SORTING;
  menuCategory = MENU_CATEGORY;

  // Default products sorting
  sortingCriteria = 'price-asc';
  category = 'all';

  // Sort products
  setSorting(sortingCriteria: string) {
    this.sortingCriteria = sortingCriteria;
    this.getProducts();
  }

  // Display product category
  setCategory(category: string) {
    this.category = category;
    this.getProducts();
  }

  // Get all filtered and sorted products from ProductService
  getProducts(): void {
    this.productService
      .getProducts(this.sortingCriteria, this.category)
      .then(products => this.products = products);
  }

  // On init, get products
  ngOnInit(): void {
    this.getProducts();
  }
}

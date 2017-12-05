import { Component } from '@angular/core';

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

  // TODO: À compléter
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  /**
   * Transform a float number in a string formatted price
   * 3.78 -> "3,78"
   * @param {number} value        Float number
   * @returns {string}            A price
   */
  transform(value: number): string {
    return value ? value.toFixed(2).replace(".", ",") : "0,00";
  }

}

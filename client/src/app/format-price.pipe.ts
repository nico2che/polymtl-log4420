import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  transform(value: number): string {
    return value ? value.toFixed(2).replace(".", ",") : "0,00";
  }

}

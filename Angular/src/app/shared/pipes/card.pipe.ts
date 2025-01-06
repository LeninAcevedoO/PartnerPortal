import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'card'
})
export class CardPipe implements PipeTransform {

  transform(plainCreditCard: string): string {
    return plainCreditCard.replace(/\s+/g, '').replace(/(\d{3})/g, '$1 ').trim();
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    value = value.replace(/\D/g, '');

    if (value.length !== 10) return value;

    const formattedNumber = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    return formattedNumber;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, '');

    // Check if the value has 10 digits
    if (value.length !== 10) return value;

    // Format the number as (123) 456-7890
    const formattedNumber = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    return formattedNumber;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscadorGenerico'
})
export class BuscadorGenericoPipe implements PipeTransform {

  transform(arreglo: any[], field: string): any[] {
    if (field) {
      const bsq = field.split(" ");
      return arreglo.reduce((acc, itm) => {
        let valida: boolean;
        const conv = JSON.stringify(itm).toLowerCase();
        bsq.forEach((word, idx) => {
          if (idx === 0 && word) valida = conv.includes(word.toLowerCase());
          if (idx !== 0 && word) valida = valida && conv.includes(word.toLowerCase());
          if ((idx === bsq.length - 1) && valida ) acc.push(itm);
        });
        return acc;
      }, []);
    }
    return arreglo;
  }


}

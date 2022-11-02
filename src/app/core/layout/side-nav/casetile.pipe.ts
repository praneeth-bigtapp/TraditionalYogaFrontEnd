import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'casetile'
})
export class CasetilePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: any): string  {
    const all = value.replace(/\s/g, '').trim();
    const capitalized = all.charAt(0).toLowerCase() + all.slice(1);
    return capitalized;
  }

}

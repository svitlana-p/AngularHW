import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform<T>(value: T[], args: any): T[] {
    const sortField = args[0];
    const sordDirection = args[1];
    let multiplier = 1;

    if (sordDirection === 'desc') {
      multiplier = -1;
    }

    value.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier
      } else {
        return 0;
      }
    })

    return value;
  }
}

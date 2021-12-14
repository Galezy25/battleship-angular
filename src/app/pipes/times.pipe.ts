import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times',
})
export class TimesPipe implements PipeTransform {
  transform(
    value: number,
    mapValue: (index: number) => any = (index) => index
  ) {
    let arr = [];
    for (let i = 0; i < value; i++) {
      arr.push(mapValue(i));
    }
    return arr;
  }
}

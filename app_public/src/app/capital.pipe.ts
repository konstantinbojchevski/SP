import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capital'
})
export class CapitalPipe implements PipeTransform {

  transform(word: any): any {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}

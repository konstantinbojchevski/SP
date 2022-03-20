import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'to64'
})
export class To64Pipe implements PipeTransform {
  transform(value: any): string {
    return new Buffer(value.data.data).toString('base64');
  }
}

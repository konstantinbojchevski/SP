import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(dateString: any): number {
    const date = new Date(dateString);
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();

    const currentTime = new Date();
    const cd = currentTime.getDate();
    const cm = currentTime.getMonth();
    const cy = currentTime.getFullYear();

    let god = cy - y;

    if(cm > m)
      god++;
    else if(cm === m)
      if(cd >= d)
        god++;

    return god;
  }

}

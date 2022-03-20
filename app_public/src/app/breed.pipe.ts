import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breed'
})
export class BreedPipe implements PipeTransform {

  transform(task: string): string {
    if(task === "1") {
      return "All-day care";
    }
    else if(task=== "2")
      return "Walking";
    else
      return "Feeding";
  }
}

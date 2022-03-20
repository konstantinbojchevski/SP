import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safeurl'
})
export class SafeurlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(url: string): unknown {
    return this.sanitizer.bypassSecurityTrustResourceUrl("data:Image/*;base64,"+url);
  }

}

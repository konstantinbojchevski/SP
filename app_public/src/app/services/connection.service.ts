import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  public isConnection: boolean = false;

  constructor() {
    merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }))
      .subscribe((isConnected) => this.isConnection = isConnected);
    console.log(this.isConnection);
  }
}

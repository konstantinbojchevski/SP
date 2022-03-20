import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeletedService {

  private messageSource = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();

  constructor() {

  }

  emitId(id: string) {
    this.messageSource.next(id);
  }
}

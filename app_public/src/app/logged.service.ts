import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  private errorMsg = new BehaviorSubject("");
  errorMessage = this.errorMsg.asObservable()


  constructor() { }

  changeState(logged: boolean) {
    this.messageSource.next(logged);
  }

  sendError(errorMsg: string) {
    console.log("HERE")
    this.errorMsg.next(errorMsg);
  }

}

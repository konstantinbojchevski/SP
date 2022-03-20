import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestDataService} from "../rest-data.service";
import {LoggedService} from "../logged.service";
import {Router} from "@angular/router";
import {DeletedService} from "../deleted.service";
import {AuthenticationService} from "../authentication.service";
import {ConnectionService} from '../services/connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9_]+$')]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
    }
  )
  constructor(public activeModal: NgbActiveModal,
              private restService: RestDataService,
              private data: LoggedService,
              private router: Router,
              private log: AuthenticationService,
              private connectionService: ConnectionService) {}

  public isConnection(): boolean {
    return this.connectionService.isConnection;
  }

  login() {
    this.log.login(this.logForm, this.activeModal);
    // this.restService
    //   .validateSignin(this.logForm.value)
    //   .subscribe({
    //     next: (msg) => {
    //       console.log(this.logForm.value.username);
    //       localStorage.setItem('username', this.logForm.value.username);
    //       this.data.changeState(true);
    //       this.router.navigate(['personprofile']);
    //       this.activeModal.close();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     }
    //   })
  }
}

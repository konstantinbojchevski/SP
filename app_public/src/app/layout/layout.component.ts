import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "../login/login.component";
import {Subscription} from "rxjs";
import {LoggedService} from "../logged.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {ConnectionService} from '../services/connection.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public signed: boolean = false;
  public errorMessage: string = "";
  subscription!: Subscription;
  // sub!: Subscription;

  constructor(private modalService: NgbModal,
              private data: LoggedService,
              private router: Router,
              private log: AuthenticationService,
              private connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.signed = message)
    // this.sub = this.data.errorMessage.subscribe((msg) => {
    //   console.log(msg);
    //   this.errorMessage = msg
    // })
    if(localStorage.getItem("username") !== null) {
      this.signed = true;
    }
  }

  open() {
    const modalRef = this.modalService.open(LoginComponent);
    console.log(this.signed);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.log.logout();
    this.signed = false;
    this.router.navigate(['']);
  }

  public signedIn(): boolean {
    return this.log.isSigned();
  }
  public isConnection(): boolean{
    console.log('tuka',this.connectionService.isConnection);
    return this.connectionService.isConnection;
  }
}

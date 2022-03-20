import { Component, OnInit } from '@angular/core';
import {RestDataService} from "../rest-data.service";
import {Ad} from "../feed/feed.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditAdComponent} from "../edit-ad/edit-ad.component";
import {DeletadComponent} from "../deletad/deletad.component";
import {Subscription} from "rxjs";
import {DeletedService} from "../deleted.service";
import {Router, RouterModule} from "@angular/router";
import {LoggedService} from "../logged.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorComponent} from "../error/error.component";
import {AuthenticationService} from "../authentication.service";
import {ConnectionService} from '../services/connection.service';

@Component({
  selector: 'app-personprofile',
  templateUrl: './personprofile.component.html',
  styleUrls: ['./personprofile.component.css']
})
export class PersonprofileComponent implements OnInit {

  public isConnection(): boolean {
    return this.connectionService.isConnection;
  }

  constructor(private restService: RestDataService,
              private modalService: NgbModal,
              private del: DeletedService,
              private router: Router,
              private data: LoggedService,
              private log: AuthenticationService,
              private connectionService: ConnectionService) { }

  public user: UserProfile = {} as UserProfile;
  public ads: Ad[] = [];
  walletForm = new FormGroup({
    wallet: new FormControl("", [Validators.required, Validators.pattern('^[a-fA-F0-9]{40}$')])
  })
  subscription!: Subscription;

  ngOnInit(): void {
    if(!this.signedIn()) {
      this.router.navigate(["/"]);
    }
    this.getUser();
    this.subscription = this.del.currentMessage.subscribe((id) => {
      for(let i = 0; i < this.ads.length; i++) {
        if(this.ads[0]._id == id) {
          this.ads.splice(i, 1);
        }
      }
    })
  }

  getUser() {
    this.restService
      // @ts-ignore
      .getUser(localStorage.getItem("username"))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user)
        this.getUserAds();
      })
  }

  getUserAds() {
    this.restService
      .getUserAds(this.user.ads)
      .subscribe((ads) => {this.ads = ads; console.log(this.ads)})
  }

  editAd(ad) {
    const modalRef = this.modalService.open(EditAdComponent);
    modalRef.componentInstance.ad = ad;
  }

  deleteAd(id) {
    const modalRef = this.modalService.open(DeletadComponent);
    modalRef.componentInstance.id = id;
  }

  deleteUser() {
    this.restService
      .deleteUser()
      .subscribe(() => {
        this.log.logout();
        localStorage.removeItem("username");
        this.data.changeState(false);
        this.router.navigate(['']);
      })
  }

  addWallet() {
    const modalRef = this.modalService.open(ErrorComponent);
    modalRef.componentInstance.errorHead = "Loading";
    modalRef.componentInstance.error = "Loading data";

    setTimeout(() => {
      this.restService
        .addWalet(this.user._id, this.walletForm.value.wallet)
        .subscribe(() => {this.user.wallet.wallet = this.walletForm.value.wallet; modalRef.close();});
    }, 5000);

  }

  public signedIn(): boolean {
    return this.log.isSigned();
  }
}

export class Payment {
  "wallet": string;
}

export class UserProfile {
  "_id": string;
  "username": string;
  "firstName": string;
  'lastName': string;
  'dateOfBirth': Date;
  "email": string;
  "numberOfPets": number;
  "location": string;
  "ads": string[];
  "previousAds": number;
  "wallet": Payment;
}

export class User {
  "username": string;
  "password": string;
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestDataService} from "../rest-data.service";
import {LoggedService} from "../logged.service";
import {Router} from "@angular/router";
import {ConnectionService} from '../services/connection.service';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent implements OnInit {

  editadForm;

  @Input() public ad = null;
  constructor(public activeModal: NgbActiveModal,
              private restService: RestDataService,
              private router: Router,
              private connectionService: ConnectionService) {}

  public isConnection(): boolean {
    return this.connectionService.isConnection;
  }

  ngOnInit(): void {
    console.log(this.ad)
      this.editadForm = new FormGroup({
      dogname: new FormControl(this.ad.dog[0].dogname),
      datefrom: new FormControl(this.ad.datefrom),
      dateto: new FormControl(this.ad.dateto),
      task: new FormControl(this.ad.task),
      price: new FormControl(this.ad.price),
      city: new FormControl(this.ad.city),
      phone: new FormControl(this.ad.phone)
    })
  }

  editAd() {
    var data: {[k: string]: any} = {};

    let dat = this.editadForm.value;

    Object.keys(dat).forEach((key) => {
      console.log(key, dat[key]);
      data[key] = dat[key]
    });

    data["id"] = this.ad._id;
    this.restService
      .editAd(data)
      .subscribe({
        next: () => {
          this.router.navigate(['/personprofile']);
        },
        error: (err: any) => {
          console.log("ERRORORORORO")
          console.log(err);
        }
      })
  }

  onSubmit() {
    console.log(this.editadForm.value)
    this.editAd();
  }

}

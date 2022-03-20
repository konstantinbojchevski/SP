import {Inject, Component, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RestDataService} from "../rest-data.service";
import {BreedsDataService} from "../breeds-data.service";
import {AuthenticationService} from "../authentication.service";
import {ConnectionService} from '../services/connection.service';

@Component({
  selector: 'app-newad',
  templateUrl: './newad.component.html',
  styleUrls: ['./newad.component.css']
})
export class NewAdComponent implements OnInit {
  newadForm = new FormGroup({
    dogname: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z\sčšžČŠŽ ]+$')]),
    datefrom: new FormControl("", Validators.required),
    dateto: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    breed: new FormControl("", Validators.required),
    task: new FormControl("", Validators.required),
    city: new FormControl("", [Validators.required, Validators.pattern('^[A-Za-z]+$')]),
    phone: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{3}')]),
    photo: new FormControl([""], Validators.required),
    goodWithDogs: new FormControl("", Validators.required),
    shedding: new FormControl("", Validators.required),
    energyLevel: new FormControl("", Validators.required)
  });

  public breeds: any;

  // @ts-ignore
  constructor(@Inject(DOCUMENT) private document,
              private restService: RestDataService,
              private router: Router,
              private breedsService: BreedsDataService,
              private log: AuthenticationService,
              private connectionService: ConnectionService) {
  }

  public isConnection(): boolean {
    return this.connectionService.isConnection;
  }

  ngOnInit(): void {
    console.log("HERE");
    if(!this.isSigned()) {
      this.router.navigate(["/"]);
    }
    this.getBreeds();
  }

  ngAfterViewInit() {
    this.setPrice();
    this.setFriendly();
    this.setEnergy();
    this.setShedding();
  }

  getBreeds() {
    this.breedsService
      .getBreeds()
      .subscribe((breeds: { message: any; }) => {this.breeds = breeds.message;
        console.log(breeds.message);});
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newadForm.get('photo').setValue(file);
      console.log(this.newadForm.value.photo);
    }
  }

  onSubmitPublish() {
    let formData = new FormData();
    let data = this.newadForm.value;

    Object.keys(data).forEach((key) => {
      console.log(key, data[key]);
      formData.append(key, data[key]);
    });
    formData.append("username", localStorage.getItem("username"));
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1])
    }
    this.restService
      .addAd(formData)
      .subscribe({
        next: () => {
          this.router.navigate(['/personprofile']);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  setPrice() {
    var price = this.document.getElementById("priceRange").value;
    this.document.getElementById("price").innerHTML = price + " €";
  }
  setEnergy() {
    var energy = this.document.getElementById("energyRange").value;
    this.document.getElementById("energy").innerHTML = energy;
  }
  setFriendly() {
    var fr = this.document.getElementById("friendlyRange").value;
    this.document.getElementById("friendly").innerHTML = fr;
  }
  setShedding() {
    var sh = this.document.getElementById("sheddingRange").value;
    this.document.getElementById("shedding").innerHTML = sh;
  }

  public isSigned() {
    return this.log.isSigned();
  }
}

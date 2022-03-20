import {Inject, Component, ElementRef, OnInit} from '@angular/core';
import {RestDataService} from "../rest-data.service";
import {BreedsDataService} from "../breeds-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-dogprofile',
  templateUrl: './dogprofile.component.html',
  styleUrls: ['./dogprofile.component.css']
})
export class DogprofileComponent implements OnInit {

  constructor(private restService: RestDataService,
              private breedsService: BreedsDataService,
              private route: ActivatedRoute,
              private auth: AuthenticationService,
              private router: Router) { }

  public ad: Ad = {} as Ad;

  ngOnInit(): void {
    this.getAd();
  }

  getAd(){
    this.route.paramMap
      .pipe(
        switchMap((parametri: ParamMap) => {
          let idAd: string = (parametri.get('id') || '').toString();
          return this.restService.getAd(
            idAd
          );
        })
      )
      .subscribe((ad: Ad) => {
        (this.ad = ad)
      });
  }

  div1:boolean=false;

  getBreedInfo(){
    console.log("tuka");
    this.div1=true;
  }

  isAdmin() {
    console.log("HERE");
    return this.auth.isAdmin();
  }

  deleteAd() {
    this.restService
      .deleteAd(this.ad._id)
      .subscribe({
        next: () => {
          this.router.navigate(['/feed']);
        },
        error: (err: any) => {
          console.log("ERRORORORORO")
          console.log(err);
        }
      })
  }

}

export class Dog {
  "_id": string;
  "dogname": string;
  'breed': string;
  'energyLevel': number;
  "goodWithDogs": number;
  "shedding": number;
  "photourl": string;
  "photo": string
}

export class Ad {
  "_id": string;
  "username": string;
  "datefrom": Date;
  "dateto": Date;
  "price": number;
  "task": string;
  "city": string;
  "phone": string;
  "dog": Dog[]
}

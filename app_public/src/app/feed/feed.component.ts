import {Inject, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {RestDataService} from "../rest-data.service";
import {BreedsDataService} from "../breeds-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

declare const CanvasJS: any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, AfterViewInit {

  page = 1;
  pageSize = 10;

  searchForm = new FormGroup({
    search: new FormControl("", [Validators.required, Validators.pattern('.*[a-zA-Z].*')])
    }
  )

  filterForm = new FormGroup({
      area: new FormControl(""),
      price: new FormControl(""),
      task: new FormControl(""),
      breed: new FormControl("")
  });

  // @ts-ignore
  constructor(@Inject(DOCUMENT) private document, private elementRef: ElementRef, private restService: RestDataService, private breedsService: BreedsDataService) { }

  public ads: Ad[] = []
  public breeds: any

  ngOnInit(): void {
    this.getAds();
    this.getBreeds();
    // this.chartInit();
  }

  ngAfterViewInit() {
    // const s = this.document.createElement('script');
    // s.type = 'text/javascript';
    // s.src = 'assets/canvas.js';
    // this.elementRef.nativeElement.appendChild(s);
    // this.chartInit();
    // this.chartInit();
    this.setPrice();
  }

  getAds() {
    this.restService
      .getAds()
      .subscribe((ads) => {this.ads = ads;
        this.chartInit();
      });
  }

  getBreeds() {
    this.breedsService
      .getBreeds()
      .subscribe((breeds) => {this.breeds = breeds.message;
        console.log(breeds.message);});
  }

  onSubmitSearch() {
    console.log(this.searchForm.value);
    this.restService
      .getAdsSearch(this.searchForm.value)
      .subscribe({
        next: (ads) => {
          console.log(ads);
          this.ads = ads;
          this.chartInit();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onSubmitFilter() {
    //console.log(this.filterForm.value);
    this.restService
      .getAdsFilter(this.filterForm.value)
      .subscribe({
        next: (ads) => {
          console.log(ads);
          this.ads = ads
          this.chartInit();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  setPrice() {
    var price = this.document.getElementById('priceRange').value;
    console.log(price);
    this.document.getElementById('price').innerHTML=price;
  }

  chartInit() {
    var data: {[k: string]: any} = {};
    console.log(this.ads.length);
    for(var i = 0; i < this.ads.length; i++) {
      let breed = this.ads[i].dog[0].breed;
      console.log(breed);
      if(data[breed]) {
        data[breed]++
      } else {
        data[breed] = 1;
      }
    }
    console.log("Heree " + data);

    let dataPoints = [];
    for (const k in data) {
      console.log("TUKA " + k);
      dataPoints.push({name : k, y:data[k]})
    }
    console.log(dataPoints);

    var chart = new CanvasJS.Chart("chartContainer", {
      theme: "dark2",
      exportFileName: "Doughnut Chart",
      exportEnabled: true,
      animationEnabled: true,
      title:{
        text: "Most common breeds"
      },
      legend:{
        cursor: "pointer",
      },
      data: [{
        type: "doughnut",
        innerRadius: 90,
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: dataPoints
      }]
    });
    chart.render();
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
  "photo": string;
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

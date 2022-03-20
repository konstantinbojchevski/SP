import { Component, OnInit } from '@angular/core';
import {RestDataService} from "../rest-data.service";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  deleted: boolean = false;
  added: boolean = false;
  constructor(private restService: RestDataService,
              private log: AuthenticationService) { }

  ngOnInit(): void {
  }

  delete() {
    this.restService
      .delDB()
      .subscribe(() => {
        this.deleted = true;
        this.added = false;
        this.log.logout();
      })
  }

  add() {
    this.restService
      .fillDB()
      .subscribe(() => {
        this.deleted = false;
        this.added = true;
      })
  }

}

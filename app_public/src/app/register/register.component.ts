import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passMatchValidator} from "../pass-match.directive";
import {RestDataService} from "../rest-data.service";
import {Router} from "@angular/router"
import {ConnectionService} from '../services/connection.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z\sčšžČŠŽ ]+$')]),
    lastName: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z\sčšžČŠŽ ]+$')]),
    dateOfBirth: new FormControl("", Validators.required),
    numberOfPets: new FormControl("", Validators.required),
    location: new FormControl("", Validators.required),
    username: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9_]+$')]),
    email: new FormControl("", [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    password2: new FormControl("", [Validators.required, Validators.minLength(8)])
  }, {validators: passMatchValidator});

  public isConnection(): boolean {
    return this.connectionService.isConnection;
  }

  constructor(private restService: RestDataService,
              private router: Router,
              private connectionService: ConnectionService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.restService
      .addUser(this.regForm.value)
      .subscribe({
        next: (user) => {
          console.log("User registered: ", user);
          this.router.navigate(['/success'], { queryParams: { name: this.regForm.value.firstName + " " + this.regForm.value.lastName} });
        },
        error: (err) => {
          console.log(err);
        }
      })

  }
}

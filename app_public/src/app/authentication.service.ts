import { Inject, Injectable } from '@angular/core';
import {Browser_Storage} from "./browser-storage";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RestDataService} from "./rest-data.service";
import {LoggedService} from "./logged.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(@Inject(Browser_Storage) private stor: Storage, private restService: RestDataService, private data: LoggedService, private router: Router) {}

  public getToken(): string | null {
    return this.stor.getItem('pettany-token');
  }

  public setToken(zeton: string): void {
    this.stor.setItem('pettany-token', zeton);
  }

  // public login(formData: ): Observable<RezultatAvtentikacije> {
  //   return this.edugeocachePodatkiStoritev.prijava(uporabnik).pipe(
  //     tap((rezultatAvtentikacije: RezultatAvtentikacije) => {
  //       this.shraniZeton(rezultatAvtentikacije['žeton']);
  //     })
  //   );
  // }

  public login(logForm: any, activeModal: any) {
    this.restService
      .validateSignin(logForm.value)
      .subscribe({
        next: (authRes: AuthResults) => {
          this.setToken(authRes['token']);
          console.log(logForm.value.username);
          localStorage.setItem('username', logForm.value.username);
          this.data.changeState(true);
          this.router.navigate(['personprofile']);
          activeModal.close();
        },
        error: (err) => {
          console.log(err);
        }
      })

  }
  public logout(): void {
    this.stor.removeItem("pettany-token");
    this.stor.removeItem("username");
  }

  public isSigned(): boolean {
    const token: string | null = this.getToken();
    if(token) {
      const content = JSON.parse(atob(token.split(".")[1]))
      return content.exp > Date.now() / 1000;
    }
    return false;
  }

  public isAdmin(): boolean {
    const token: string | null = this.getToken();
    if(token) {
      const content = JSON.parse(atob(token.split(".")[1]))
      console.log(content);
      console.log(content.role)
      return content.role == "admin"
    }
    return false;

  }

}

export class AuthResults {
  'token': string;
}

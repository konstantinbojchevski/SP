import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Dog, Ad } from './feed/feed.component';
import {UserProfile} from "./personprofile/personprofile.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorComponent} from "./error/error.component";
import {AuthResults} from "./authentication.service";
import {Browser_Storage} from "./browser-storage";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RestDataService {

  constructor(private http: HttpClient, private modalService: NgbModal, @Inject(Browser_Storage) private stor: Storage) { }

  private apiUrl = "http://localhost:3000/api";

  public addUser(formData: any): Observable<any> {
    const url: string = `${this.apiUrl}/register`;
    return this.http
      .post(url, formData)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)));
  }

  public getAds(): Observable<Ad[]> {
    const url: string =`${this.apiUrl}/ads`;
    return this.http
      .get<Ad[]>(url)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public getAdsSearch(formData: any): Observable<Ad[]> {
    const url: string =`${this.apiUrl}/search?search=${formData.search}`;
    return this.http
      .get<Ad[]>(url)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public getAdsFilter(formData: any): Observable<Ad[]>{
    console.log(formData);
    const url: string =`${this.apiUrl}/filter?city=${formData.area}&price=${formData.price}&breed=${formData.breed}&task=${formData.task}`;
    return this.http
      .get<Ad[]>(url)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public getAd(id: String): Observable<Ad> {
    const url: string =`${this.apiUrl}/ad?id=${id}`;
    return this.http
      .get<Ad>(url)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public validateSignin(formData: any): Observable<AuthResults> {
    const url: string = `${this.apiUrl}/signin`;
    return this.http
      .post<AuthResults>(url, formData)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)));
  }

  public getUser(username: String): Observable<UserProfile> {
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.stor.getItem('pettany-token')}`,
      }),
    };

      const url: string = `${this.apiUrl}/user?username=${username}`;
      return this.http
      .get<UserProfile>(url, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public getUserAds(ids: string[]): Observable<Ad[]> {
    let idsstring = this.makeAdsString(ids);
    const url: string =`${this.apiUrl}/adsById?${idsstring}`;
    console.log(url);
    return this.http
      .get<Ad[]>(url)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  private makeAdsString(ids: string[]): string {
    let base = ""
    for(var i = 0; i < ids.length; i++) {
      if(i > 0)
        base += "&";
      base += `ads[]=${ids[i]}`

    }
    console.log(base);
    return base;
  }

  public addAd(formData: any): Observable<any> {
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.stor.getItem('pettany-token')}`,
      }),
    };
    const url: string = `${this.apiUrl}/newad`;
    return this.http
      .post(url, formData, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)));
  }

  public editAd(formData: any): Observable<any> {
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.stor.getItem('pettany-token')}`,
      }),
    };
    console.log(formData)
    const url: string = `${this.apiUrl}/editDog`;

    return this.http
      .post(url, formData, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)));
  }

  public deleteAd(id: any): Observable<any> {
    const url: string = `${this.apiUrl}/deleteDog`;
    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.stor.getItem('pettany-token')}`,
      }),
      body: {
        username: localStorage.getItem("username"),
        id: id
      }
    };
    return this.http
      .delete(url, options)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public deleteUser(): Observable<any> {
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.stor.getItem('pettany-token')}`,
      }),
    };
    let username = localStorage.getItem("username");
    const url: string = `${this.apiUrl}/user/delete?username=${username}`;

    return this.http
      .delete(url, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public addWalet(id: any, wallet: any): Observable<any> {
    const url: string = `${this.apiUrl}/wallet`
    let formData = new FormData();
    console.log(id);
    console.log(wallet);
    formData.append("id", id);
    formData.append("wallet", wallet);
    console.log(formData.get("wallet"));

    const options = {
      body: {
        id: id,
        wallet: wallet
      }
    };

    return this.http
      .post(url, options)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public fillDB(): Observable<Ad[]>  {
    const url: string = `${this.apiUrl}/db`
    return this.http
      .get<any>(url)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public delDB(): Observable<Ad[]>  {
    const url: string = `${this.apiUrl}/user/clear`
    return this.http
      .get<any>(url)
      .pipe(retry(1), catchError(this.obdelajNapako.bind(this)))
  }

  public obdelajNapako(napaka: HttpErrorResponse) {
    const modalRef = this.modalService.open(ErrorComponent);
    modalRef.componentInstance.errorHead = "Error";
    modalRef.componentInstance.error = "Error in api call";
    return throwError(
      () =>
        `Prišlo je do napake '${napaka.status}' z opisom`
    );
  }
}

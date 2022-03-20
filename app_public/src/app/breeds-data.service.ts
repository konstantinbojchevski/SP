import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BreedsDataService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://dog.ceo/api/breeds/list/all';

  public getBreeds(): Observable<any> {
    const url: string =`${this.apiUrl}`;
    return this.http
      .get<any>(url)
      .pipe(retry(1), catchError(this.obdelajNapako))
  }

  private obdelajNapako(napaka: HttpErrorResponse) {
    return throwError(
      () =>
        `Prišlo je do napake '${napaka.status}' z opisom '${
          napaka.error.sporočilo || napaka.statusText
        }'`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from "rxjs/operators";
import { TruckOwner } from '../model/truck-owner';

@Injectable({
  providedIn: 'root'
})
export class TruckOwnersService {
  BaseURL: string = 'http://localhost:3000/truck-owners';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'something happened with request, please try again later'
    );
  }
  GetAllTruckOwners(): Observable<TruckOwner> {
    return this.http
      .get<TruckOwner>(this.BaseURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  AddTruckOwner(truckOwner: TruckOwner): Observable<TruckOwner> {
    return this.http
      .post<TruckOwner>(this.BaseURL, JSON.stringify(truckOwner), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetNumberOfTruckOwners(): Observable<number> {
    return this.http
      .get<number>(this.BaseURL + '/count', this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}

import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Fanatic } from 'src/app/models/fanatic';
@Injectable({
  providedIn: 'root'
})
export class FanaticService {

  basePath = 'https://fortlom-account.herokuapp.com/api/v1/userservice/fanatics';
  //basePath = 'http://localhost:8081/api/v1/userservice/fanatics';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  
  constructor(private http: HttpClient) { }
  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message} `);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
  
    return throwError('Something happened with request, please try again later');
  }
  
  // Create Fanatic
  create(item: any): Observable<Fanatic> {
    return this.http.post<Fanatic>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get Fanatic by id
  getById(id: any): Observable<Fanatic> {
    return this.http.get<Fanatic>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getUserByfanaticname(fanaticname: string): Observable<Fanatic> {
    return this.http.get<Fanatic>(`${this.basePath}/username/${fanaticname}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getUserByartistnameandlastname(fanaticname: string,fanaticlastname:string): Observable<Fanatic> {
    return this.http.get<Fanatic>(`${this.basePath}/name/${fanaticname}/lastname/${fanaticlastname}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get All Fanatics
  getAll(): Observable<Fanatic> {
    return this.http.get<Fanatic>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Update Fanatic
  update(id: any, item: any): Observable<Fanatic> {
  
    return this.http.put<Fanatic>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
  
  }
  updateFanaticBan(id:number): Observable<Fanatic>
{
  return this.http.put<Fanatic>(`${this.basePath}/ban/${id}`,this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}
  // Delete Fanatic
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  checkfanatic(fanaticId:number):Observable<boolean>{
    return this.http.get<boolean>(`${this.basePath}/check/${fanaticId}`,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}

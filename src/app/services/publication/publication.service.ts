import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Publication } from 'src/app/models/publication';
@Injectable({
  providedIn: 'root'
})
export class PublicationService {


  basePath ='https://fortlom-content.herokuapp.com/api/v1/contentservice';
  
  //basePath ='http://localhost:8082/api/v1/contentservice';
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
  
  // Create Publicacion
  create(item: Publication,artistId:number,type:string): Observable<Publication> {
    return this.http.post<Publication>(`${this.basePath}/artists/${artistId}/type/${type}/publications`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get Publicacion by id
  getById(id: any): Observable<Publication> {
    return this.http.get<Publication>(`${this.basePath}/publications/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get All Publicaciones
  getAll(): Observable<Publication> {
    return this.http.get<Publication>(`${this.basePath}/publications`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Update Publicacion
  update(id: any, item: any): Observable<Publication> {
    return this.http.put<Publication>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Delete Publicacion
  delete(id: any) {
    return this.http.delete(`${this.basePath}/publications/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getAllPublicationByArtistId(artistId:number): Observable<Publication>
  {
    return this.http.get<Publication>(`${this.basePath}/artists/${artistId}/publications`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  existpublication(publicationId:number):Observable<boolean>{
    return this.http.get<boolean>(`${this.basePath}/publications/check/${publicationId}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

}

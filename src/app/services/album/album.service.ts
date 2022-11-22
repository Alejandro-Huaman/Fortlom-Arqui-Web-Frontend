import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Album } from 'src/app/models/Album';
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  
  basePath = 'https://fortlom-account.herokuapp.com/api/v1/userservice/albums';

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

  getAll(): Observable<Album> {
    return this.http.get<Album>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  update(id: any, item: any): Observable<Album> {
    return this.http.put<Album>(`${this.basePath}/album/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getAlbumsbyArtistId(id: any): Observable<Album> {
    return this.http.get<Album>(`${this.basePath}/artist/${id}/albums`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(id:any,item: any): Observable<Album> {
    return this.http.post<Album>(`${this.basePath}/artist/${id}/newAlbum`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}

import { Injectable } from '@angular/core';
import {catchError, retry} from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Music } from 'src/app/models/Music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  basePath = 'https://fortlom-account.herokuapp.com/api/v1/userservice/songs';

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

  update(id: any, item: any): Observable<Music> {
    return this.http.put<Music>(`${this.basePath}/song/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getSongsByAlbumId(id: any): Observable<Music> {
    return this.http.get<Music>(`${this.basePath}/album/${id}/songs`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(id:any,item: any): Observable<Music> {
    return this.http.post<Music>(`${this.basePath}/album/${id}/newSong`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}

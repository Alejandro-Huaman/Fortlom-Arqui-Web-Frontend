import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Multimedia } from 'src/app/models/multimedia';
@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  basePath = 'https://fortlom-multimedia.herokuapp.com/api/v1/multimediaservice';
  //basePath = 'http://localhost:8086/api/v1/multimediaservice';
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
  
  // Create Multimedia
  createimageforpublication(item: File,publicationId:number){
    const formData = new FormData();
    formData.append('multipartFile', item);
    return this.http.post(`${this.basePath}/upload/publications/${publicationId}/images`, formData,  { observe: 'response' })
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  createimageforuser(item: File,userId:number){
    const formData = new FormData();
    formData.append('multipartFile', item);
    return this.http.post(`${this.basePath}/upload/users/${userId}/images`, formData,  { observe: 'response' })
     .pipe(
       retry(2),
       catchError(this.handleError));
 }
 createimageforAlbum(item: File,userId:number){
  const formData = new FormData();
  formData.append('multipartFile', item);
  return this.http.post(`${this.basePath}/upload/albums/${userId}/images`, formData,  { observe: 'response' })
     .pipe(
       retry(2),
       catchError(this.handleError));

 }
 getImageByAlbum(id:number){
  
  return this.http.get<Multimedia>(`${this.basePath}/album/${id}/images`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
 
  getImageByPublicationId(id:number){
  
    return this.http.get<Multimedia>(`${this.basePath}/publications/${id}/images`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  
  }
  getImageByUserId(id:number){
  
    return this.http.get<Multimedia>(`${this.basePath}/users/${id}/images`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  
  }
  // Update Multimedia
  update(id: any, item: any): Observable<Multimedia> {
    return this.http.put<Multimedia>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Delete Multimedia
  delete(id: any) {
    return this.http.delete(`${this.basePath}/delete/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}

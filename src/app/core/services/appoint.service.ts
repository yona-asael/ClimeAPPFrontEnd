import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PaginationModel } from '../models/pagination.model';
import {AppointModel} from '../models/appoint.model';
import {IAppoint} from '../interface/Appoint.interface';
import {TokenStorage} from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AppointService {

    private API = environment.API_ENDPOINT + 'appoints';
    private httpOptions = {
    headers: new HttpHeaders({
      'Auth-Token': this.tokenStorage.getAccessToken().replace(/['"]+/g, ''),
       'Content-Type': 'application/json',
    }),
    params: new HttpParams(),
  };

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage   
  ) { }

  public findOne(id: string): Observable<AppointModel> {
    return this.http.get<AppointModel>(this.API + `/${id}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  public getALL(): Observable<AppointModel[]> {
    return this.http.get<AppointModel[]>(this.API + '/', this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

  public getList(limit: Number, page: Number): Observable<PaginationModel> {
    const params = { ... this.httpOptions }
    params.params = new HttpParams().set('limit', `${limit}`).set('page', `${page}`);
    return this.http.get<PaginationModel>(this.API + '/', params).pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

  public create(user: IAppoint): Observable<AppointModel> {
    return this.http.post<AppointModel>(this.API, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public update(user: AppointModel): Observable<AppointModel> {
    return this.http.put<AppointModel>(this.API + `/${user._id}`, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public delete(id: String): Observable<boolean> {
    return this.http.delete<boolean>(this.API + `/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
